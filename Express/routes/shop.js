const express = require("express");

const router = express.Router();
const path = require("path");
const rootDir = require("../util/root-dir");

//exactly "/" is matched due to "get"
//routes like "/home" won't be handled despite starting with "/"

router.get("/", (req, res, next) => {
  //   res.send("<h1>Hello from Express!</h1>");
  //   res.sendFile("./../views/shop.html");
  //    this method doesn't work because sendFile
  //    needs absolute path, not relative path

  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  //__dirname results in abs path of routes/ dir
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
