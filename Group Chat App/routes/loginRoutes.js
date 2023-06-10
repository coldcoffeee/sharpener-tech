const express = require("express");
const loginControllers = require("../controllers/loginControllers");
const router = express.Router();

router.get("/", loginControllers.getLoginPage);
router.post("/", loginControllers.loginUser);

module.exports = router;
