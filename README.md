
# Projeto Integrador - 2022 - Semestre 1

Este projeto tem como objetivo a captura de um JSON de uma API renderizando gráficos e tabelas.

# Passos para criação do projeto (linux)

```sh
# cria conda env
conda create -n integrador
conda activate integrador

# instalação do nodejs
mamba install -c conda-forge nodejs

# verificação das versões do node e npm
node -v
npm -v

# inicialização da aplicação npm
npm init -y

# instalação de dependências
npm i -D nodemon
npm install express
npm install bootstrap
npm install pug
npm install body-parser

# criação de alguns arquivos
touch app.js
touch start.js
mkdir routes
touch routes/index.js
mkdir views
mkdir css
```

Adicão do seguinte código em app.js:

```js
const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);

module.exports = app;
```

Adição do seguinte código em start.js:

```js
const app = require('./app');

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
```

Adição do seguinte código em routes/index.js:

```js
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  //res.send('It works!');
  res.render('form');
});

module.exports = router;
```

Adição do seguinte código em package.json:

```js
"scripts": {
  "watch": "nodemon ./start.js"
},
```

Inicialização do servidor
```sh
npm run watch
```

# Referências

- https://www.sitepoint.com/build-simple-beginner-app-node-bootstrap-mongodb/
- https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
