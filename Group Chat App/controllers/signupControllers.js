const path = require("path");
const rootDir = require("../utils/root-dir");
const User = require("../models/userModel");
const { hash } = require("bcrypt");

exports.getSignupPage = (req, res) => {
  res.sendFile(path.join(rootDir, "views", "signup.html"));
};

exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(200)
        .json({ message: "A user already exists with this email!" });
    }

    const hashedPW = await hash(password + "", 10);

    const user = await User.create({ name, email, password: hashedPW });

    if (user) {
      res.status(201).json({ message: "Success", redirect: "/login" });
    } else {
      res.status(500).json({ message: "Something went wrong!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
