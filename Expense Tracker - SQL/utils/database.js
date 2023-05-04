const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-tracker", "root", "wordpass123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
