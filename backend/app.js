const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/sign-up', (req, res)=> {
const {username, password} = req.body;
if (!username || !password) {
  return res.status(400).json({
    message: "Todos os campos são obrigatórios!"
  });
}
res.status(200).json({
  message: "Cadastro feito com sucesso!", 
  user:{
    username,
    password
  }});
})

app.post('/tweets', (req, res)=> {
  const {username, tweet} = req.body;
  if (!username || !tweet) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios!"
    });
  }
  res.status(200).json({
    message: "tweet enviado com sucesso!", 
    tweet:{
      username,
      tweet
    }});
  })

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});