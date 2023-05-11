const { compare } = require("bcrypt");

const User = require("../models/user");
module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) res.status(500).json({ message: "Invalid email or password!" });
    else {
      const status = await compare(password + "", user.password);
      if (status) res.status(201).redirect("/expense");
      else res.status(500).json({ message: "Invalid email or password!" });
    }
  } catch (err) {
    console.log("\n\nError logging in: ", err);
  }
};
