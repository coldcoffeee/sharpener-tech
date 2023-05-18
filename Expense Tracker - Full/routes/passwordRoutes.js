const express = require("express");
const passwordControllers = require("../controllers/passwordControllers");

const router = express.Router();

router.get("/forgotpassword", passwordControllers.forgotPasswordPage);

module.exports = router;
