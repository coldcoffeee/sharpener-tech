const Sequelize = require("sequelize");

const sequelize = new Sequelize("appointments", "root", "wordpass123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
