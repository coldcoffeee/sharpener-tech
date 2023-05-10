const User = require("../models/user");
module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });
    if (user) res.status(201).json(user);
    else res.status(401).json({});
  } catch (err) {
    console.log("\n\nError logging in: ", err);
  }
};
