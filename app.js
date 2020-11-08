var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const registerApp = require("./routes/index");


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

registerApp(app);

app.listen(5000, () => {
  console.log("Listening on port 5000");
})

// module.exports = app;
