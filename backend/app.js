import express from 'express'
import pg from 'pg'


const app = express();
const port = 3000;


const { Client } = pg
 
const PGHOST='ep-fragrant-smoke-a5ebmtrw.us-east-2.aws.neon.tech'
const PGDATABASE='neonTweterooDb'
const PGUSER='neonTweterooDb_owner'
const PGPASSWORD='GNF1xvsDj5lT'
const ENDPOINT_ID='ep-fragrant-smoke-a5ebmtrw'


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

app.get('/', (req, res) => {  
  res.send('Hello World!');
});

app.post('/sign-up', async (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    return res.status(204).json({
      message: "Todos os campos são obrigatórios!"
    });
  }
  const hasUser = async (username) => {
    const { rowCount } = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    return rowCount > 0; 
  }
  if (await hasUser(username)) return res.status(409).send("Usuário já cadastrado!");
  const { rows }  = await client.query('INSERT INTO users (username, avatar) VALUES ($1, $2) RETURNING *', [username, avatar])
  res.status(201).json({ 
    message: "Novo usuário cadastrado com sucesso",
    body: { 
      username : username,
      avatar: avatar, 
      id: rows[0].id,
      created_at: rows[0].created_at
     }
  });
});

app.post('/tweets', async (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    return res.status(204).json({
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

app.get('/tweets', async  (req, res) => { 
  const {rows} = await client.query('SELECT users.username, users.avatar, tweets.tweet, tweets.created_at FROM tweets JOIN users ON tweets.user_id = users.id ORDER BY tweets.created_at DESC LIMIT 10');
  res.json(
    rows.map(row => ({
      username: row.username,
      avatar: row.avatar,
      tweet: row.tweet,
      created_at: row.created_at
    }))
  );
});



app.get('/tweets/:username', async (req, res) => { 
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
if (rowCount === 0) return res.status(404).json({ message : "Usuário ou tweets não encontrados!"})
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
