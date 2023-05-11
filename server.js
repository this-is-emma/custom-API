require('dotenv').config();

const express = require('express');
var cookieParser = require('cookie-parser');

const app = express();
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

require('./controllers/auth.js')(app);
require('./data/db');

//Web Dev Simpl - I DID NOT DO app.use(express.json) because I have bodyParser

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);


// TODO: Add each controller here, after all middleware is initialized.

const indexRouter = require('./routes/index')
app.use('/index', indexRouter)

app.listen(3000, () => {
    console.log('API listening on port http://localhost:3000!');
  });

module.exports = app;
