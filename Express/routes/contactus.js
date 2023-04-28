const express = require("express");
const root = require("../util/root-dir");

const router = express.Router();

router.get("/contact-us", (req, res, next) => {
  res.sendFile(root + "/views/contact-us.html");
});

router.post("/contact-us", (req, res, next) => {
  console.log(req.body.name + " " + req.body.email);
  res.redirect("/success");
});

router.get("/success", (req, res, next) => {
  res.sendFile(root + "/views/success.html");
});

module.exports = router;
