const rootDir = require("../util/root-dir");
const express = require("express");
const root = require("../util/root-dir");
const path = require("path");

exports.getContactUsPage = (req, res, next) => {
  res.sendFile(root + "/views/contact-us.html");
};

exports.postContactUsData = (req, res, next) => {
  console.log(req.body.name + " " + req.body.email);
  res.redirect("/success");
};

exports.getSuccessPage = (req, res, next) => {
  res.sendFile(root + "/views/success.html");
};
