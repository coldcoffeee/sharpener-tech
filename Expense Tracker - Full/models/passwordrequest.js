const db = require("../utils/database");
const Sequelize = require("sequelize");

const PasswordResetRequest = db.define("passwordresetrequest", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.INTEGER,
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = PasswordResetRequest;
