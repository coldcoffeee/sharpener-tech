const path = require("path");
const rootDir = require("../utils/root-dir");
const User = require("../models/userModel");
const { compare } = require("bcrypt");

const activeUsers = {};

exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(rootDir, "views", "login.html"));
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({ message: "Invalid creds!" });
    }

    const status = await compare(password + "", user.password + "");
    if (status) {
      req.session.userId = user.id;
      req.session.user = user;
      req.session.validated = true;

      activeUsers[user.id] = [user.name, email];

      return res.status(201).json({ redirect: "/chat" });
    } else {
      console.log(status, "\n\n");
      return res.status(200).json({ message: "Invalid creds!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.logoutUser = (req, res) => {
  delete activeUsers[req.session.userId];
  req.session.destroy();
  res.redirect("/login");
};

exports.activeUsers = activeUsers;
// res.status(201).json({ message: "Success", redirect: "/login" });
