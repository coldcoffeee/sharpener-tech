const Sequelize = require("sequelize");
const db = require("../utils/database");

const User = db.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    allowNull: false,
  },
  isPremiumUser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  totalExpense: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;
