const root = require("../utils/root");
const path = require("path");

exports.forgotPasswordPage = (req, res) => {
  res.sendFile(path.join(root, "views", "forgot.html"));
};
