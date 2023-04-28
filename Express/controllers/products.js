const rootDir = require("../util/root-dir");
const path = require("path");

exports.getAddProduct = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
};

exports.getShowProducts = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
};
