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
const passport = require("passport");
const session = require("express-session");
const exphbs = require("express-handlebars");



app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret 
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions

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

//Handlebar Views
app.set("views", "./app/views");
app.engine("hbs", exphbs({
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");
    
//App Routes

app.get("/", (req, res) => {
  console.log("SERVING HTML");
  res.sendFile(__dirname + "/dist/index.html");
});


router.route("/posts")
  .post((req, res) => {
    let post = db.Post
      .create({
        post: req.body.post,
        location: req.body.location,
        mood: req.body.mood
      })
      .then(post => {
        console.log("POSTING POST");
        console.log(req.body);
        res.send(req.body);
      })
      .catch(error => {
        console.error(error);
      })
    })

    .get((req, res) => {
      db.Post.findAll()
        .then(posts => {
          console.log("GETTING POST");
          res.send(posts);
        })
        .catch(error => {
          console.error(error);
        })
    })
    // .delete((req, res) => {
    //   db.Post.destroy({where: {id:req.params.id}})
    //   .then(post => {
    //     console.log("DELETED");
    //     res.sendStatus(post);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   })
    // })

  router.route("/user")
    .post((req, res) => {
      let user = db.User
        .create({
          name: req.body.name,
          username: req.body.username,
        })
        .then(post => {
          console.log("POSTING USER");
          console.log(req.body);
          res.send(req.body);
        })
        .catch(error => {
          console.error(error);
        });
    })
    .get((req, res) => {
      db.User
        .findAll()
        .then(posts => {
          console.log("GETTING POST");
          res.send(posts);
        })
        .catch(error => {
          console.error(error);
        });
    });

app.listen(port, function() {
  console.log("listening on" + port);
});

console.log("Server working");
