const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/", userController.addUser);

router.delete("/", userController.deleteUser);

router.get("/", userController.getAll);

module.exports = router;
