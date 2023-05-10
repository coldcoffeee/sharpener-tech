const User = require("../models/user");

exports.registerUser = async (req, res, next) => {
  try {
    // res.json(req.body);
    const { name, email, password } = req.body;
    if (await User.findOne({ where: { email } })) {
      res
        .status(401)
        .json({ message: "A user with this email already exists!" });
    } else {
      const response = await User.create({
        name,
        email,
        password,
      });
      res.status(201).json(response);
    }
  } catch (err) {
    console.log("\n\nError registering the user: ", err);
  }
};
