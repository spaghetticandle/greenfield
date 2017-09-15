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
const Sequelize = require("sequelize");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require('./db.js');

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