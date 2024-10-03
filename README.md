# Tweteroo

Tweteroo é uma aplicação de microblogging onde os usuários podem se registrar, fazer login e enviar tweets. A aplicação é construída com um back-end em Node.js e um front-end usando Next.js.


## Índice

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Back-end](#back-end)
  - [Front-end](#front-end)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalando Dependências](#instalando-dependências)
- [Executando a Aplicação](#executando-a-aplicação)
  - [Back-end](#back-end-1)
  - [Front-end](#front-end-1)
- [Endpoints da API](#endpoints-da-api)
  - [Usuários](#usuários)
  - [Tweets](#tweets)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Autor](#autor)

## Recursos

- Cadastro de usuários
- Login com autenticação JWT
- Envio de tweets
- Visualização de tweets
- Filtragem de tweets por usuário


## Tecnologias Utilizadas

### Back-end
- **Node.js**: Plataforma para executar o JavaScript no servidor.
- **Express**: Framework para construir aplicações web em Node.js.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **JWT**: JSON Web Tokens para autenticação.
- **dotenv**: Gerenciamento de variáveis de ambiente.

### Front-end
- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **Tailwind CSS**: Framework CSS para estilos utilitários e responsivos.
- **ChadUI**: Biblioteca de componentes para facilitar o desenvolvimento da interface do usuário.


## Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/SEU_USUARIO/Tweteroo.git
   cd Tweteroo/backend

## Configuração do Ambiente
Para rodar a aplicação, você precisa configurar suas variáveis de ambiente. Crie um arquivo `.env` na raiz do seu projeto e adicione o seguinte conteúdo:

```
DATABASE_URL=‘postgresql://neonTweterooDb_owner:GNF1xvsDj5lT@ep-twilight-bread-a53j0ndk.us-east-2.aws.neon.tech/neonTweterooDb?sslmode=require’
PGHOST=‘ep-fragrant-smoke-a5ebmtrw.us-east-2.aws.neon.tech’
PGDATABASE=‘neonTweterooDb’
PGUSER=‘neonTweterooDb_owner’
PGPASSWORD=‘GNF1xvsDj5lT’
PGPORT=5432
PGSSL=‘true’
```

## Instalando Dependências

Para instalar as dependências do back-end, execute:

```bash
cd backend
npm install
```
Para instalar as dependências do front-end, execute:

```bash
cd frontend
npm install
```

## Executando a Aplicação
### Back-end

Para iniciar o servidor do back-end, execute:
```bash
cd backend
npm start
```
### Front-end

Para iniciar a aplicação do front-end, execute:
```bash
cd frontend
npm start
```

A aplicação do front-end estará disponível em http://localhost:3000.

## Endpoints da API

### Usuários

- POST /sign-up: Cadastra um novo usuário.
- POST /login: Realiza login do usuário.

### Tweets

- POST /tweets: Envia um novo tweet (requer autenticação).
- GET /tweets: Retorna os últimos 10 tweets.
- GET /tweets/:username: Retorna os tweets de um usuário específico (requer autenticação).

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, faça um fork deste repositório e crie um pull request.

## Licença

Este projeto é licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

## Autor

Sarah Iulli 