const express = require("express");
const contactUsController = require("../controllers/contactus");

const router = express.Router();

router.get("/contact-us", contactUsController.getContactUsPage);

router.post("/contact-us", contactUsController.postContactUsData);

router.get("/success", contactUsController.getSuccessPage);

module.exports = router;
