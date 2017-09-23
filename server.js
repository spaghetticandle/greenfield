require("dotenv").config();
const webpack = require('webpack');
const config = require('./webpack.config.js');
const webpackMiddleware = require('webpack-dev-middleware');
const compiler = webpack(config);
const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT;
//const Sequelize = require("sequelize");
const router = express.Router();
const bodyParser = require("body-parser");
//const db = require('./db.js');
const fakedata = require('./fakedata.json');
// require("dotenv").config();
// const webpack = require('webpack');
// const config = require('./webpack.config.js');
// const webpackMiddleware = require('webpack-dev-middleware');
// const compiler = webpack(config);
// // const express = require("express");
// const path = require("path");
// // const app = express();
// const mysql = require("mysql");
// const port = process.env.PORT;
// //const Sequelize = require("sequelize");
// const router = express.Router();
// const bodyParser = require("body-parser");
// //const db = require('./db.js');

const ToneAnalyzerV3 = require('node_modules/../watson-developer-cloud/tone-analyzer/v3');
var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();
var exphbs = require("express-handlebars");



//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret 
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const tone_analyzer = new ToneAnalyzerV3({
    username: process.env.REACT_APP_WATSON_USERNAME,
    password: process.env.REACT_APP_WATSON_PASSWORD,
    version_date: '2016-05-19',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Watson-Learning-Opt-Out': 'true'
    }
});

app.post("/api/newentry", (req, res) => {
  console.log(req.body);
  const analysis = tone_analyzer.tone(req.body, function (error, response) {if (error) {
      console.log('error:', error);
    } else
    console.log(JSON.stringify(response, null, 2));
    }
  );
  res.send(analysis);
});

app.get("/api/diary", (req, res) => {
  res.send(fakedata);
});

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);

//load passport strategies 
require('./app/config/passport/passport.js')(passport,models.user);
 
// Sync Database
models.sequelize.sync().then(function() { 
    console.log('Nice! Database looks fine') 
}).catch(function(err) { 
    console.log(err, "Something went wrong with the Database Update!")
});

app.get("/", function(req, res) {
  res.send("Welcome to Passport with Sequelize");
});

app.listen(5000, function(err) {
  if (!err) console.log("Site is live");
  else console.log(err);
});
console.log("Server working");

module.exports.tone_analyzer = tone_analyzer;
