const root = require("../utils/root");
const path = require("path");
const sendMail = require("../utils/mail");
const PasswordResetRequest = require("../models/passwordrequest");
const User = require("../models/user");
const { hash } = require("bcrypt");
const sequelize = require("../utils/database");

exports.forgotPasswordPage = async (req, res) => {
  try {
    req.session.destroy();
    res.sendFile(path.join(root, "views", "forgot.html"));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.sendResetLink = async (req, res) => {
  const txn = await sequelize.transaction();
  try {
    const { email } = req.body;
    const url =
      req.protocol + "://" + req.get("host") + "/password/resetpassword";
    const { v4: uuidv4 } = require("uuid");

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Email is not registered!");
    }

    const resetRequest = await user.createPasswordresetrequest(
      {
        id: uuidv4(),
      },
      { transaction: txn }
    );

    await sendMail(email, url, resetRequest.id);
    await txn.commit();
    res
      .status(201)
      .json({ message: "Reset link sent, please check your email." });
  } catch (err) {
    await txn.rollback();
    console.log(`\n\n\n\n${err}\n\n\n\n`);
    res.status(400).json(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return res.redirect("/404");
    const resetRequest = await PasswordResetRequest.findByPk(id);

    if (!resetRequest) return res.redirect("/404");

    res.sendFile(path.join(root, "views", "reset.html"));
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.updatePassword = async (req, res, next) => {
  const txn = await sequelize.transaction();
  try {
    const password = req.body.password;
    const id = req.params.id;
    if (!id)
      return res
        .status(201)
        .json({ message: "Invalid request!", redirect: "/login" });

    const resetRequest = await PasswordResetRequest.findByPk(id);
    if (!resetRequest)
      res.status(201).json({ message: "Invalid request!", redirect: "/login" });

    if (resetRequest.isActive) {
      await resetRequest.update({ isActive: false }, { transaction: txn });
      const user = await User.findByPk(resetRequest.userId);

      await txn.commit();
      const saltrounds = 10;
      const hashedPW = await hash(password + "", saltrounds);
      user.update({ password: hashedPW }, { transaction: txn });
      await txn.commit();
      res.status(201).json({ message: "Password updated!" });
    } else throw new Error("Request Expired!");
  } catch (err) {
    await txn.rollback();
    res.status(400).json({ message: JSON.stringify(err.message``) });
  }
};
