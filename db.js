const mysql = require("mysql");
const Sequelize = require("sequelize");


const db = new Sequelize("greenfield", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

db
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const User = db.define("User", {
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  post: Sequelize.INTEGER,
  personality: Sequelize.INTEGER,
});

const Post = db.define("Post", {
  post: Sequelize.STRING,
  location: Sequelize.STRING,
  mood: Sequelize.STRING,
});

const Personality = db.define("Personality", {
  personality: Sequelize.STRING
});

User.sync();
Post.sync()
Personality.sync(); 
 
 
exports.User = User;
exports.Post = Post;
exports.Personality = Personality;
