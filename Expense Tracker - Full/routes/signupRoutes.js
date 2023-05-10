const express = require("express");
const signupControllers = require("../controllers/signupControllers");

const router = express.Router();

router.post("/", signupControllers.registerUser);

module.exports = router;
