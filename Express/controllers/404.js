const path = require("path");
const root = require("../util/root-dir");
exports.get404 = (req, res, next) => {
  res.status(404).sendFile(path.join(root, "views", "404.html"));
};
