const Sequelize = require("sequelize");
const database = require("../utils/database");

const Expense = database.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: Sequelize.STRING,
  category: Sequelize.STRING,
});

module.exports = Expense;
