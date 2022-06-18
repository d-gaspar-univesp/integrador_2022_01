const express = require('express');

const router = express.Router();

var json = []
var nome_arquivo = ''
var status_B = [0, 0, 0];
var status_E = [0, 0, 0];
var status_B_total = 0;
var status_E_total = 0;

router.get('/', (req, res) => {
  //res.send('It works!');
  res.render('graphs', {
    title: 'Projeto Integrador',
    status_B: status_B,
    status_E: status_E,
    status_B_total,
    status_E_total,
    nome_arquivo: nome_arquivo,
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
// json example
// [{"id":"7185","nome_arquivo":"06-17-2022 10_10_37","data_upload":"1655471437","data_evento":"21-10-21","hora_evento":"10:20:40","status":"E"},
// {"id":"7186","nome_arquivo":"06-17-2022 10_10_37","data_upload":"1655471437","data_evento":"21-10-21","hora_evento":"10:21:36","status":"B"}]

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
    json = JSON.parse(data);
    nome_arquivo = json[0]["nome_arquivo"];

    // turno
    for (var i in json) {
      var hour = json[i]["hora_evento"].split(":")[0]
      if (hour >= 2 && hour < 10) {
        json[i]["turno"] = "T1";
        if (json[i]["status"] == "B") {
          status_B[0] += 1;
          status_B_total += 1;
        } else if (json[i]["status"] == "E") {
          status_E[0] += 1;
          status_E_total += 1;
        }
      } else if (hour >= 10 && hour < 18) {
        json[i]["turno"] = "T2";
        if (json[i]["status"] == "B") {
          status_B[1] += 1;
          status_B_total += 1;
        } else if (json[i]["status"] == "E") {
          status_E[1] += 1;
          status_E_total += 1;
        }
      } else {
        json[i]["turno"] = "T3";
        if (json[i]["status"] == "B") {
          status_B[2] += 1;
          status_B_total += 1;
        } else if (json[i]["status"] == "E") {
          status_E[2] += 1;
          status_E_total += 1;
        } 
      }
      
      //console.log(i + ' ' + hour + ' ' + json[i]["turno"]);
    }
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

// ------------------------------------------------------------------

module.exports = router;