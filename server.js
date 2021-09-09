// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date', function (req, res) {
  let { date } = req.params;

  if (date) {
    if (!date.includes('-')) {
      date *= 1;
    }

    const sendDate = new Date(date).toUTCString();

    if (sendDate == 'Invalid Date') {
      res.json({ error: 'Invalid Date' });
    }

    res.json({
      unix: Date.parse(sendDate),
      utc: sendDate,
    });
  } else {
    let current = new Date();
    res.json({
      unix:
        current.getHours() +
        ':' +
        current.getMinutes() +
        ':' +
        current.getSeconds(),
      utc: current,
    });
  }
});

// listen for requests :)

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
