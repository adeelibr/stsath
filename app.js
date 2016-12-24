var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var config = require('./config');

// view engine setup
// app.set('views', path.join(__dirname, 'server/views'));
// app.set('view engine', 'ejs');

// static files in app directory structure
app.use(express.static('./server/static'));
app.use(express.static('./client/dist'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('superSecret', config.secret);

var routes = require('./server/routes/index');
app.use('/', routes);

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
})

// module.exports = app;
