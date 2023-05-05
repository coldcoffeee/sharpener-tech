const Sequelize = require("sequelize");

const sequelize = new Sequelize("todo-list", "root", "wordpass123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
