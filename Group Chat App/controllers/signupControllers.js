const path = require("path");
const rootDir = require("../utils/root-dir");
exports.getSignupPage = (req, res) => {
  res.sendFile(path.join(rootDir, "views", "signup.html"));
};
