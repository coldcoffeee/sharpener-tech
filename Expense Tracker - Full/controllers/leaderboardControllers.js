const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("sequelize");

exports.getLeaderboards = async (req, res) => {
  try {
    const result = await Expense.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
          required: true,
        },
      ],
      attributes: [
        [sequelize.fn("sum", sequelize.col("amount")), "totalExpense"],
      ],
      raw: true,
      group: ["expense.userUserId"],
      order: sequelize.literal("totalExpense DESC"),
    });

    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
