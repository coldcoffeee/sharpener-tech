const db = require("../utils/database");
const Sequelize = require("sequelize");

const Order = db.define("order", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  orderId: Sequelize.STRING,
  paymentid: Sequelize.STRING,
  status: Sequelize.STRING,
});

module.exports = Order;
