const path = require("path");
const rootDir = require("../utils/root-dir");
const Group = require("../models/groupModel");
const User = require("../models/userModel");

const createGroup = async (req, res) => {
  try {
    const { groupName, participants } = req.body;
    const adminId = req.session.userId;
    if (!adminId || !groupName) throw new Error("Invalid request!");

    const group = await Group.create({ name: groupName });

    await group.addUser(adminId);
    await group.addAdmin(adminId);

    for (const userId of participants) {
      await group.addUser(userId);
    }

    res.status(201).json({ message: "Group created successfully!" });
  } catch (err) {
    // res.status(500).json({ message: "Something went wrong!" });
    res.status(500).json({ message: err });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { groupId, adminsList } = req.body;
    const group = await Group.findByPk(groupId);
    for (const adminId of adminsList) {
      const hasUser = await group.hasUser(adminId);
      if (hasUser) await group.addAdmin(adminId);
    }
    res.status(201).json({ message: "Admins added successfully!" });
  } catch (err) {
    // res.status(500).json({ message: "Something went wrong!" });
    res.status(500).json({ message: err });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const { groupId, adminsList } = req.body;
    const group = await Group.findByPk(groupId);
    for (const adminId of adminsList) {
      const hasUser = await group.hasAdmin(adminId);
      if (hasUser) await group.removeAdmin(adminId);
    }
    res.status(201).json({ message: "Admins removed successfully!" });
  } catch (err) {
    // res.status(500).json({ message: "Something went wrong!" });
    res.status(500).json({ message: err });
  }
};

const getGroups = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findByPk(userId);
    const userGroups = await user.getGroups({ raw: true });
    res.status(201).json({ userGroups });
  } catch (err) {
    // res.status(500).json({ message: "Something went wrong!" });
    res.status(500).json({ message: err });
  }
};

module.exports = {
  createGroup,
  addAdmin,
  removeAdmin,
  getGroups,
};
