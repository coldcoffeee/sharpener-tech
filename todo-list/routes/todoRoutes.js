const express = require("express");

const todoControls = require("../controllers/todoControls");

const router = express.Router();

router.get("/", todoControls.getAllTasks);
router.post("/", todoControls.addNewTask);
router.put("/", todoControls.completeTask);
router.delete("/:id", todoControls.removeTask);

module.exports = router;
