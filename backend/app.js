const express = require('express');
const app = express();
const port = 3000;

let tweets = [];
let users = [];

app.use(express.json());

app.get('/', (req, res) => {  
  res.send('Hello World!');
});

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios!"
    });
  }
  users.push({ username, avatar });
  res.status(200).send('OK');
});

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios!"
    });
  }
  function getUserAvatar(username) {
    return users.find(user => user.username === username);
  }
  const userAvatar = getUserAvatar(username);


  tweets.push({
    username,
    avatar: userAvatar.avatar, 
    tweet
  });
  res.status(200).send('OK');
});

app.get('/tweets', (req, res) => { 
  const lastTenTweets = tweets.slice(-10); 
  res.send(lastTenTweets);
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});