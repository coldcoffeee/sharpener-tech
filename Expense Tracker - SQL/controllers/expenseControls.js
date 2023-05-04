const Expense = require("../models/expense");

exports.postExpense = async (req, res, next) => {
  try {
    const { price, description, category } = req.body;
    const reply = await Expense.create({
      price: price,
      description: description,
      category: category,
    });
    res.status(201).json({ id: reply.id, message: "Entry saved!" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Couldn't save data!" });
  }
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
