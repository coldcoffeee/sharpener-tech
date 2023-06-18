const express = require("express");
const groupControllers = require("../controllers/groupControllers");
const auth = require("../utils/auth");
const router = express.Router();

router.post("/create", auth.isAuthorised, groupControllers.createGroup);
router.get("/all", auth.isAuthorised, groupControllers.getGroups);

module.exports = router;
