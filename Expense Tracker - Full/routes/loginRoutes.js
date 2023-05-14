const express = require("express");
const loginController = require("../controllers/loginController");
const { notAuthenticated } = require("../controllers/authenticate");
const router = express.Router();

router.get("/", notAuthenticated, loginController.loginPage);
router.post("/", notAuthenticated, loginController.authorize);
router.get("/logout", loginController.logout);

module.exports = router;
