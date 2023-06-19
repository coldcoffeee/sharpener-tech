const path = require("path");
const rootDir = require("../utils/root-dir");
const { Op } = require("sequelize");
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
    const lastMessageId = req.get("lastMessageId");
    const messages = await Chat.findAll({
      where: {
        userId: req.session.userId,
        groupId,
        id: {
          [Op.gt]: lastMessageId,
        },
      },
      raw: true,
    });

    res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Something went wrong" });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const userId = req.session.userId;
    const messages = await Chat.findAll({
      where: {
        userId,
      },
      raw: true,
      // order: sequelize.col("id"),
    });
    res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Something went wrong" });
  }
};
