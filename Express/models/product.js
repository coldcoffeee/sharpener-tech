const fs = require("fs");
const root = require("../util/root-dir");
const path = require("path");

const file = path.join(root, "data", "products.json");
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    let prod = [];
    fs.readFile(file, (err, data) => {
      if (!err) {
        prod = JSON.parse(data);
      }
      prod.push(this);
      console.log("Here: ", prod);
      fs.writeFileSync(file, JSON.stringify(prod));
      //   above three lines won't work if
      //   written outside readFile block
      //   cuz readFile is an async method
    });
  }

  static fetchAll() {
    let prod = JSON.parse(fs.readFileSync(file));
    return prod;
  }
};
