const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const expressStaticGzip = require('express-static-gzip');

// initialize logger
const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({
      filename: './server.log',
      timestamp: () => (new Date()).toLocaleTimeString(),
      handleExceptions: true,
      humanReadableUnhandledException: true,
      datePattern: '.yyyy-MM-dd',
      prepend: false,
      level: "info",
      localTime: true
    })
  ]
});

let app = express();
app.use(expressStaticGzip('./dist'));
app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'));
app.use(expressWinston.errorLogger({
  winstonInstance: logger,
  msg: "{{err.message}}",
  level: "info"
}));
let server = app.listen(3002, () => {
  console.log('Server up and running at http://localhost:3002')
});
