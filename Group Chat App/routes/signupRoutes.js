const express = require("express");
const signupControllers = require("../controllers/signupControllers");
const router = express.Router();

router.get("/", signupControllers.getSignupPage);

module.exports = router;
