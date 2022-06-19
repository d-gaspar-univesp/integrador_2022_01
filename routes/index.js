const express = require('express');

const router = express.Router();

var json = []
var nome_arquivo = ''
var status = {
  "T1": {"B":0, "E":0},
  "T2": {"B":0, "E":0},
  "T3": {"B":0, "E":0}
};
var yield = {};
var yield_T1 = {
  "date": [],
  "yield": [],
  "color": []
};

router.get('/', (req, res) => {
  //res.send('It works!');
  res.render('graphs', {
    title: 'Projeto Integrador',
    status,
    yield,
    yield_T1,
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

    // json loop
    for (var i in json) {
      var hour = json[i]["hora_evento"].split(":")[0]
      var date = json[i]["data_evento"];

      if (!(date in yield)) {
        yield[date] = ["T1", "T2", "T3"];
        yield[date]["T1"] = ["B", "E"];
        yield[date]["T1"]["B"] = 0;
        yield[date]["T1"]["E"] = 0;
        yield[date]["T2"] = ["B", "E"];
        yield[date]["T2"]["B"] = 0;
        yield[date]["T2"]["E"] = 0;
        yield[date]["T3"] = ["B", "E"];
        yield[date]["T3"]["B"] = 0;
        yield[date]["T3"]["E"] = 0;
      }

      if (hour >= 6 && hour < 15) {
        json[i]["turno"] = "T1";
        switch (json[i]["status"]) {
          case "B":
            yield[date]["T1"]["B"] += 1;
            status["T1"]["B"] += 1;
            break;
          case "E":
            yield[date]["T1"]["E"] += 1;
            status["T1"]["E"] += 1;
            break;
        }
      } else if (hour >= 15) {
        json[i]["turno"] = "T2";
        switch (json[i]["status"]) {
          case "B":
            yield[date]["T2"]["B"] += 1;
            status["T2"]["B"] += 1;
            break;
          case "E":
            yield[date]["T2"]["E"] += 1;
            status["T2"]["E"] += 1;
            break;
        }
      } else {
        json[i]["turno"] = "T3";
        switch (json[i]["status"]) {
          case "B":
            yield[date]["T3"]["B"] += 1;
            status["T3"]["B"] += 1;
            break;
          case "E":
            yield[date]["T3"]["E"] += 1;
            status["T3"]["E"] += 1;
            break;
        }
      }
      
      //console.log(i + ' ' + hour + ' ' + json[i]["turno"]);
    }

    for (date in yield) {
      if ((yield[date]["T1"]["B"] + yield[date]["T1"]["E"]) == 0) {
        yield_T1["date"].push(date);
        yield_T1["yield"].push(0);
        yield_T1["color"].push("rgba(85,85,85,1)");
      } else {
        yield_T1["date"].push(date);
        yield_T1["yield"].push(yield[date]["T1"]["B"] / (yield[date]["T1"]["B"] + yield[date]["T1"]["E"]));
        yield_T1["color"].push("rgba(85,85,85,1)");
      }
      
      if ((yield[date]["T2"]["B"] + yield[date]["T2"]["E"]) == 0) {
        yield[date]["T2"]["value"] = 0;
        yield[date]["T2"]["color"] = "rgba(85,85,85,1)";
      } else {
        yield[date]["T2"]["value"] = yield[date]["T2"]["B"] / (yield[date]["T2"]["B"] + yield[date]["T2"]["E"]);
        yield[date]["T2"]["color"] = "rgba(255,0,0,1)";
      }
      
      if ((yield[date]["T3"]["B"] + yield[date]["T3"]["E"]) == 0) {
        yield[date]["T3"]["value"] = 0;
        yield[date]["T3"]["color"] = "rgba(85,85,85,1)";
      } else {
        yield[date]["T3"]["value"] = yield[date]["T3"]["B"] / (yield[date]["T3"]["B"] + yield[date]["T3"]["E"]);
        yield[date]["T3"]["color"] = "rgba(255,0,0,1)";
      }
    }
    console.log(yield_T1["date"] + ' ' + yield_T1["yield"] + ' ' + yield_T1["color"]);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

// ------------------------------------------------------------------

//https://stackoverflow.com/questions/60001579/how-to-change-the-color-of-chart-js-points-depending-on-the-label

module.exports = router;