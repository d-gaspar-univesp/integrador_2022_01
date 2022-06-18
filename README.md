
# Projeto Integrador - 2022 - Semestre 1

Este projeto tem como objetivo a captura de um JSON de uma API renderizando gráficos e tabelas.

links:

> https://cambuinfo.com.br/
> https://integrador202201.herokuapp.com/

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
npm install chart.js

# criação de alguns arquivos
touch app.js
touch start.js
mkdir routes
touch routes/index.js
mkdir views
mkdir css
```

Inicialização do servidor
```sh
npm run watch
```

# Referências

- https://www.sitepoint.com/build-simple-beginner-app-node-bootstrap-mongodb/
- https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
