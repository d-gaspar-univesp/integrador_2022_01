const express = require('express');

const router = express.Router();

var json = []

router.get('/', (req, res) => {
  //res.send('It works!');
  res.render('graphs', {
    title: 'Projeto Integrador',
    json
  });
});

/*
router.post('/', (req, res) => {
  console.log(req.body);
  res.render('form', {
    title: 'Projeto Integrador'
  });
});
*/

// ------------------------------------------------------------------

// get json
let url = "https://cambuinfo.com.br/consultaJson.php?busca=tudo";

const https = require('https');

https.get(url, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    //console.log('test' + data);
    //console.log('test' + JSON.parse(data)[0]["id"]);
    console.log('test' + JSON.parse(data).length);
    json = JSON.parse(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

// ------------------------------------------------------------------

module.exports = router;