const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const chatControllers = require("../controllers/chatControllers");

router.get("/", auth.isAuthorised, chatControllers.getChatPage);

// router.get("/activeUsers", chatControllers.getActiveUsers);
router.get("/activeUsers", auth.isAuthorised, chatControllers.getActiveUsers);

router.get("/all", auth.isAuthorised, chatControllers.getMessages);
// router.get("/groups", auth.isAuthorised, chatControllers.getAllGroups);

router.post("/saveMessage", auth.isAuthorised, chatControllers.saveMessage);

module.exports = router;
