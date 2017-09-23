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

const ToneAnalyzerV3 = require('node_modules/../watson-developer-cloud/tone-analyzer/v3');
const PersonalityInsightsV3 = require('node_modules/../watson-developer-cloud/personality-insights/v3');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

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

  
app.get("/", (req, res) => {
  console.log("SERVING HTML");
  res.sendFile(__dirname + "/dist/index.html");
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
      res.send(response);
    }  
  });
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
