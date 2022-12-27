// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get('/api/:date?', (req, res) => {
  let date = req.params.date;
  const testDateType = req.path.replace(/\/api\/?/, '');
  const containsXml = /%/.test(testDateType);
  let unix = new Date(date);
  let utc = unix.toUTCString();


  if(date === 'this-is-not-a-date') {
    return res.json({
      "error": "invalid Date"
    });
  };
  if (!date) {
    date = Date.now();
    
    return res.json({
      "unix": Date.now(),
      "utc": new Date(date).toUTCString()
    })
  };

  const test = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(date);

  if(test) {
    return res.json({
      unix: unix.getTime(),
      utc
      })
  } else if (!test) {
    date = containsXml ? Date.parse(date) : parseInt(date);
    unix = new Date(date);
    utc = unix.toUTCString()

    return res.json({
      unix: date,
      utc
    })
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
