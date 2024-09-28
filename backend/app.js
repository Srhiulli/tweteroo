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
    return res.status(400).json({
      message: "Todos os campos são obrigatórios!"
    });
  }
  const hasUser = async (username) => {
    const { rowCount } = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    return rowCount > 0; 
  }
  if (await hasUser(username)) return res.status(409).send("Usuário já cadastrado!");
  await client.query('INSERT INTO users (username, avatar) VALUES ($1, $2) RETURNING *', [username, avatar])
  res.status(200).send('Novo usuário cadastrado')

});

app.post('/tweets', async (req, res) => {
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
    return res.status(409).send("Usuário não encontrado!");
  } 
    const userData = userInfo.user
    console.log(userData);
    await client.query(
      'INSERT INTO tweets (users_id, tweet) VALUES ($1, $2)',
      [userData.id, tweet]
    );
    return res.status(200).json({ message: "Tweet enviado com sucesso!" });
});

app.get('/tweets', (req, res) => { 
  const lastTenTweets = tweets.slice(-10); 
  res.send(lastTenTweets);
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

app.get('/tweets/:username', (req, res) => { 
  const { username } = req.params; 

  function getUserTweets(username) {
    return tweets.filter(tweet => tweet.username === username); 
  }

  const userTweets = getUserTweets(username);
    res.send(userTweets); 

});


