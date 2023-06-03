const Sequelize = require("sequelize");

const db = new Sequelize("chat_app", "root", "wordpass123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db;
