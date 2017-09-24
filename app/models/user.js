module.exports = function(sequelize, Sequelize) {

  const User = sequelize.define("user", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    username: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    post: Sequelize.INTEGER,
    personality: Sequelize.INTEGER
  });

  return User;
};

/*
Users = id, name, username, password, personality analysis
Post = userid, entry, date, mood






*/