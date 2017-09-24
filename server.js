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
const fakedata2 = require('./fakedata2.json');

const ToneAnalyzerV3 = require('node_modules/../watson-developer-cloud/tone-analyzer/v3');
const PersonalityInsightsV3 = require('node_modules/../watson-developer-cloud/personality-insights/v3');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJwt = require('passport-jwt');

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const _ = require("lodash");

const users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'tasmanianDevil';

const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  const user = users[_.findIndex(users, { id: jwt_payload.id })];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(passport.initialize());

app.use(webpackMiddleware(compiler, {
        noInfo: false,
        quiet: false,
        lazy: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
        publicPath: config.output.publicPath,  
        index: "index.html",
        headers: { "X-Custom-Header": "yes" },
        stats: {
            colors: true
        },
        reporter: null,
        serverSideRender: false,
    }));

app.use(express.static(path.join(__dirname, 'dist')));

// app.get("/", (req, res) => {
//   console.log("SERVING HTML");
//   res.sendFile(__dirname + "/dist/index.html");
// });

app.post("/login", function (req, res) {
  let name = '';
  if (req.body.name && req.body.password) {
    name = req.body.name;
    const password = req.body.password;
  }
  // usually this would be a database call:
  const user = users[_.findIndex(users, { name: name })];
  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }

  if (user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    const payload = { id: user.id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json("Success! You can not see this without a token");
});

const tone_analyzer = new ToneAnalyzerV3({
    username: process.env.REACT_APP_WATSON_USERNAME,
    password: process.env.REACT_APP_WATSON_PASSWORD,
    version_date: '2016-05-19',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Watson-Learning-Opt-Out': 'true'
    }
});

const personality_insights = new PersonalityInsightsV3({
    username: process.env.REACT_APP_PERSONALITY_USERNAME,
    password: process.env.REACT_APP_PERSONALITY_PASSWORD,
    version_date: '2016-05-19',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Watson-Learning-Opt-Out': 'true'
    }
});

app.post("/api/newentry", (req, res) => {
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

app.post("/api/personality", (req, res) => {
  personality_insights.profile(req.body, (error, response) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Personality analysis successful');
      console.log(response);
      res.send(response);
    }  
  });
});

app.get("/api/personality_analysis", (req, res) => {
    res.send(fakedata2);
});

// router.route("/posts").post((req, res) => {
//   let post = db.Post
//     .create({
//       post: req.body.post,
//       location: req.body.location,
//       mood: req.body.mood
//     })
//     .then(post => {
//       console.log(req.body);
//       res.send(req.body);
//     });
// });
// router.get("/api", (req, res) => {
//   console.log("GET REQUEST!");
//   res.send("Get Working");
// })
// ;
// router.post('/api', (req, res) => {
//   console.log('POST REQUEST');
//   res.send('Post Working');
// })


app.listen(port, function() {
  console.log("listening on" + port);
});
console.log("Server working");

module.exports.tone_analyzer = tone_analyzer;
