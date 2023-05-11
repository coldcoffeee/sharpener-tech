const expenseController = require("../controllers/expenseControls");
const express = require("express");

const router = express.Router();

router.get("/", expenseController.getExpensesPage);
router.get("/all", expenseController.getExpenses);
router.post("/", expenseController.postExpense);
router.delete("/:id", expenseController.removeExpense);
router.put("/", expenseController.updateExpenses);

module.exports = router;
