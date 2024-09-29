import express from 'express'
import pg from 'pg'
import jwt from 'jsonwebtoken';


const app = express();
const port = 3000;
const SECRET_KEY = 'minha_chave_secreta';

const { Client } = pg
const PGHOST = 'ep-fragrant-smoke-a5ebmtrw.us-east-2.aws.neon.tech'
const PGDATABASE = 'neonTweterooDb'
const PGUSER = 'neonTweterooDb_owner'
const PGPASSWORD = 'GNF1xvsDj5lT'
const ENDPOINT_ID = 'ep-fragrant-smoke-a5ebmtrw'


const client = new Client({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  endpoint: ENDPOINT_ID,
  port: 5432,
  ssl: true,
})
await client.connect()
app.use(express.json());


function hasJWTMiddleware(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1]
  if (!token) {
      return res.status(403).json({ message: 'Token não fornecido!' });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
          return res.status(403).json({ message: 'Token inválido!' });
      }
      req.user = user; 
  });
  next();
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/sign-up', async (req, res) => {
  const { username, avatar, password } = req.body;
  if (!username || !password || !avatar) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios!"
    });
  }
  const hasUser = async (username) => {
    const { rowCount } = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    return rowCount > 0;
  }
  if (await hasUser(username)) return res.status(400).json({ message: "Escolha outro usernmae" });
  const { rows } = await client.query('INSERT INTO users (username, avatar, password) VALUES ($1, $2, $3) RETURNING *', [username, avatar, password])
  res.status(201).json({
    message: "Novo usuário cadastrado com sucesso",
    body: {
      username: username,
      avatar: avatar,
      id: rows[0].id,
      created_at: rows[0].created_at
    }
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios!"
    });
  }
  const getValidUser = async (username, password) => {
    const { rowCount, rows } = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
    if (rowCount > 0) {
      return rows[0]
    }
  }
  const validUser = await getValidUser(username, password)
  if (!validUser) {
    res.status(401).json({ message: "Usuário ou senha incorretos!" })
  }
  const token = jwt.sign(
    { id: validUser.id, username: validUser.username },
     SECRET_KEY, 
    { expiresIn: '1h' }
  );
  return res.status(200).json({
    user: validUser, 
    token: token
  })
})

app.post('/tweets', hasJWTMiddleware, async (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios!"
    });
  }
  const getUser = async (username) => {
    const { rowCount, rows } = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    )
    return { exists: rowCount > 0, user: rows[0] };
  }
  const userInfo = await getUser(username);
  if (!userInfo.exists) {
    return res.status(409).json({
      message: "Usuário não encontrado!",
    });
  }
  const userData = userInfo.user
  await client.query(
    'INSERT INTO tweets (user_id, tweet) VALUES ($1, $2)',
    [userData.id, tweet]
  );
  return res.status(201).json({
    message: "Tweet enviado com sucesso!",
    body: {
      username: username,
      tweet: tweet,
      avatar: userData.avatar,
    }
  });
});

app.get('/tweets', async (req, res) => {
  const { rows } = await client.query('SELECT users.username, users.avatar, tweets.tweet, tweets.created_at FROM tweets JOIN users ON tweets.user_id = users.id ORDER BY tweets.created_at DESC LIMIT 10');
  res.json(
    rows.map(row => ({
      username: row.username,
      avatar: row.avatar,
      tweet: row.tweet,
      created_at: row.created_at
    }))
  );
});

app.get('/tweets/:username', hasJWTMiddleware, async (req, res) => {
  const { username } = req.params;
  const { rows, rowCount } = await client.query(
    `SELECT users.username, users.avatar, tweets.tweet, tweets.created_at 
     FROM tweets 
     JOIN users ON tweets.user_id = users.id 
     WHERE users.username ILIKE $1 
     ORDER BY tweets.created_at DESC 
     LIMIT 10`,
    [username]
  );
  if (rowCount === 0) return res.status(404).json({ message: "Usuário ou tweets não encontrados!" })
  res.status(200).json(
    rows.map(row => ({
      username: row.username,
      avatar: row.avatar,
      tweet: row.tweet,
      created_at: row.created_at
    }))
  )
})

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
