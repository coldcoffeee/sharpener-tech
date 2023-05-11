const Expense = require("../models/expense");
const root = require("../utils/root");
const { join } = require("path");
//fuel food electricity movie
exports.postExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;
    const reply = await Expense.create({
      price: amount,
      description: description,
      category: category,
    });
    res.status(201).json({ id: reply.id, message: "Entry saved!" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Couldn't save data!" });
  }
};

exports.getExpensesPage = async (req, res, next) => {
  // try {
  //   const tuples = await Expense.findAll();
  //   res.status(201).json({ success: true, entries: tuples });
  // } catch (err) {
  //   res
  //     .status(400)
  //     .json({ success: false, message: "Error occured while fetching data!" });
  // }
  console.log(`\n\n${root}\n\n`);
  res.sendFile(root + "/views/expenses.html");
};

exports.getExpenses = async (req, res, next) => {
  try {
    const tuples = await Expense.findAll();
    res.status(201).json({ success: true, entries: tuples });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Error occured while fetching data!" });
  }
};

exports.removeExpense = async (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
  try {
    const reply = await Expense.destroy({ where: { id: id } });
    res.status(201).json({ success: true, message: "Entry Deleted!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Couldn't delete!" });
  }
};

exports.updateExpenses = async (req, res, next) => {
  try {
    const reply = await Expense.update(
      {
        price: parseInt(req.body.price),
        description: req.body.description,
        category: req.body.category,
      },
      { where: { id: req.body.id } }
    );
    res.status(201).json({ message: "Entry updated!" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Couldn't update!" });
  }
};
