const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const chatControllers = require("../controllers/chatControllers");

router.get("/", auth.isAuthorised, chatControllers.getChatPage);
router.get("/activeUsers", auth.isAuthorised, chatControllers.getActiveUsers);
router.get("/all", chatControllers.getMessages);

router.post("/saveMessage", chatControllers.saveMessage);

module.exports = router;
