const path = require("path");
const rootDir = require("../utils/root-dir");

const Chat = require("../models/chatModel");

exports.getActiveUsers = (req, res) => {
  const { activeUsers } = require("./loginControllers");
  res.json(activeUsers);
};

exports.getChatPage = (req, res) => {
  res.sendFile(path.join(rootDir, "views", "chat.html"));
};

exports.saveMessage = async (req, res) => {
  try {
    const { message, groupId } = req.body;
    const chat = await Chat.create({
      userId: req.session.userId,
      message,
      groupId,
    });
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(501).json({ message: "Something went wrong" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const groupId = req.get("groupId");
    const messages = await Chat.findAll({
      where: {
        userId: req.session.userId,
        groupId,
      },
      raw: true,
    });

    res.status(200).json({ messages, groupId });
  } catch (err) {
    res.status(501).json({ message: "Something went wrong" });
  }
};
