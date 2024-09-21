const express = require('express');
const app = express();
const port = 3000;

let tweets = []
let users = []
let avatar = 'https://i.pravatar.cc/300'

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/sign-up', (req, res)=> {
const {username} = req.body;
if (!username ) {
  return res.status(400).json({
    message: "Todos os campos são obrigatórios!"
  });
}
users.push({ username, avatar });
console.log('Usuários:', users);
res.status(200).json({
  message: "Cadastro feito com sucesso!", 
  user:{
    username,
    avatar
  }});
})

app.post('/tweets', (req, res)=> {
  const {username, tweet} = req.body;
  if (!username || !tweet) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios!"
    });
  }
  tweets.push({ 
    username, 
    avatar: users.avatar, 
    tweet 
});
console.log('tweets:', tweets);

  res.status(200).json({
    message: "tweet enviado com sucesso!", 
    tweet:{
      username,
      tweet, 
      avatar
    }});
  })

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});


console.log(tweets, users);
