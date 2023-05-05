const Sequelize = require("sequelize");
const db = require("../utils/db");

const Task = db.define("task", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.STRING,
  completed: Sequelize.BOOLEAN,
});

module.exports = Task;
