// const express = require("express");
const User = require("../models/user");

exports.addUser = async (req, res, next) => {
  const { name, mail, phone } = req.body;
  try {
    await User.create({ name: name, email: mail, phone: phone });
    res.status(201).json({ msg: "Success", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.toString(), success: false });
  }
};

exports.deleteUser = async (req, res, next) => {
  console.log(req.body);
  const { mail } = req.body;
  try {
    const response = await User.destroy({ where: { email: mail } });
    if (!response) throw new Error("couldn't delete");
    res.status(201).json({ msg: "Success", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed", success: false });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await User.findAll();
    if (!result) throw new Error("couldn't get all");
    res.status(201).json({ entries: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed", success: false });
  }
};
