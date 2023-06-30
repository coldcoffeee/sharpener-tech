const path = require("path");
const rootDir = require("../utils/root-dir");
const Group = require("../models/groupModel");
const User = require("../models/userModel");
const { Op } = require("sequelize");

const createGroup = async (req, res) => {
  try {
    const { groupName, participants, admins } = req.body;
    const adminId = req.session.userId;
    if (!adminId || !groupName) throw new Error("Invalid request!");

    const group = await Group.create({ name: groupName });

    await group.addUser(adminId);
    await group.addAdmin(adminId);

    for (const userId of participants) {
      await group.addUser(userId);
    }

    for (const adminId of admins) {
      if (participants.includes(adminId)) await group.addAdmin(adminId);
    }

    res.status(201).json({
      message: "Group created successfully!",
      id: group.id,
      edit: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
    // res.status(500).json({ message: err });
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
    res.status(500).json({ message: "Something went wrong!" });
    // res.status(500).json({ message: err });
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
    res.status(500).json({ message: "Something went wrong!" });
    // res.status(500).json({ message: err });
  }
};

const getGroups = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findByPk(userId);
    const userGroups = await user.getGroups({
      raw: true,
      joinTableAttributes: [],
    });
    res.status(201).json({ userGroups });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
    // res.status(500).json({ message: err });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Op.not]: req.session.userId,
        },
      },
      attributes: ["name", "email", "id"],
    });
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const isAdmin = async (req, res) => {
  try {
    const groupId = req.get("groupId");

    const userId = req.session.userId;

    const group = await Group.findByPk(groupId);

    const admin = await group.hasAdmin(userId);

    res.status(200).json({ isAdmin: admin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const getCurrentParticipants = async (req, res) => {
  try {
    const groupId = req.get("groupId");

    const group = await Group.findByPk(groupId);

    const participants = await group.getUsers({
      attributes: ["id", "name", "email"],
      raw: true,
      where: {
        id: {
          [Op.not]: req.session.userId,
        },
      },
      joinTableAttributes: [],
    });

    const admins = await group.getAdmin({
      attributes: ["id", "name", "email"],
      raw: true,
      where: {
        id: {
          [Op.not]: req.session.userId,
        },
      },
      joinTableAttributes: [],
    });

    const users = await User.findAll({
      where: {
        id: {
          [Op.not]: req.session.userId,
        },
      },
      attributes: ["name", "email", "id"],
    });

    console.log(admins);

    res.status(200).json({ participants, admins, users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { groupId, groupName, participants, admins } = req.body;
    const adminId = req.session.userId;
    if (!adminId || !groupName) throw new Error("Invalid request!");

    const group = await Group.findByPk(groupId);

    console.log(req.body);

    // return res.status(201).json(req.body);

    group.name = groupName;
    // await group.save();

    // await group.removeUsers();
    // await group.removeAdmins();

    // const oldUsers = await group.getUsers();
    // const oldAdmins = await group.getAdmin();

    // for (const user of oldUsers) {
    //   await group.removeUser(user);
    // }
    // for (const admin of oldAdmins) {
    //   await group.removeAdmin(admin);
    // }

    await group.setUsers([]);
    await group.setAdmin([]);

    await group.addUser(adminId);
    await group.addAdmin(adminId);

    for (const userId of participants) {
      await group.addUser(userId);
    }

    for (const adminId of admins) {
      if (participants.includes(adminId)) await group.addAdmin(adminId);
    }

    group.save();

    res.status(201).json({
      message: "Group updated successfully!",
      id: group.id,
      edit: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
    // res.status(500).json({ message: err });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const group = await Group.findByPk(groupId);
    await group.destroy();
    res.status(201).json({ message: "Deletion successful" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  createGroup,
  addAdmin,
  removeAdmin,
  getGroups,
  getAllUsers,
  isAdmin,
  getCurrentParticipants,
  updateGroup,
  deleteGroup,
};
