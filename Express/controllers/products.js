const rootDir = require("../util/root-dir");
const path = require("path");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res, next) => {
  new Product(req.body.title).save();
  console.log(req.body);
  res.redirect("/");
};

exports.getShowProducts = (req, res, next) => {
  console.log(Product.fetchAll());
  res.sendFile(path.join(rootDir, "views", "shop.html"));
};
