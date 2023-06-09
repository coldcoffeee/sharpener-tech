const Expense = require("../models/expense");
const User = require("../models/user");
const root = require("../utils/root");
const { join } = require("path");
const sequelize = require("../utils/database");

const upload = require("../utils/aws");

exports.postExpense = async (req, res, next) => {
  const txn = await sequelize.transaction();
  try {
    const { amount, description, category } = req.body;
    const user_id = req.session.user_id;
    const reply = await Expense.create(
      {
        amount,
        description,
        category,
        userUserId: user_id,
      },
      {
        transaction: txn,
      }
    );
    const user = await User.findByPk(user_id);
    await User.update(
      {
        totalExpense: parseInt(user.totalExpense) + parseInt(amount),
      },
      {
        where: {
          user_id,
        },
        transaction: txn,
      }
    );
    await txn.commit();
    res.status(201).json({ id: reply.id, message: "Entry saved!" });
  } catch (err) {
    await txn.rollback();
    res.status(400).json({ success: false, message: "Couldn't save data!" });
  }
};

exports.getExpensesPage = async (req, res, next) => {
  if (req.session.validated) {
    res.sendFile(root + "/views/expenses.html");
  } else {
    res.redirect("/login");
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const userUserId = req.session.user_id;
    const pageNo = req.params.pageNo;

    const offset = (pageNo - 1) * 5;

    const tuples = await Expense.findAll({
      where: { userUserId },
      limit: 5,
      offset,
    });
    res.status(201).json({ success: true, entries: tuples });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Error occured while fetching data!" });
  }
};

exports.removeExpense = async (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
  const userUserId = req.session.user_id;
  const txn = await sequelize.transaction();
  try {
    const expense = await Expense.findByPk(id);

    const user = await User.findByPk(userUserId);
    await User.update(
      {
        totalExpense: user.totalExpense - expense.amount,
      },
      {
        where: {
          user_id: userUserId,
        },
      }
    );

    const reply = await Expense.destroy({
      where: { id: id, userUserId },
      transaction: txn,
    });

    await txn.commit();

    res.status(201).json({ success: true, message: "Entry Deleted!" });
  } catch (err) {
    await txn.destroy();
    console.log(err);
    res.status(400).json({ success: false, message: "Couldn't delete!" });
  }
};

exports.updateExpenses = async (req, res, next) => {
  try {
    const { id, amount, description, category } = req.body;
    await Expense.update(
      {
        amount,
        description,
        category,
      },
      { where: { id } }
    );
    res.status(201).json({ message: "Entry updated!" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Couldn't update!" });
  }
};

exports.download = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    const records = await user.getExpenses({ raw: true });
    const url = await upload(
      `${req.session.user.name} ${new Date()}.json`,
      JSON.stringify(records)
    );
    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Couldn't generate file!" });
  }
};
