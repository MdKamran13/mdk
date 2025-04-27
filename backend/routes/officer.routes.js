const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const officerController = require("../controllers/officer.controller");

router.post(
  "/register",
  [
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("phoneNumber")
      .matches(/^[6-9]\d{9}$/)
      .withMessage("Invalid phone number"),
    body("adharNumber")
      .matches(/^\d{12}$/)
      .withMessage("Aadhar number must be 12 digits"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("position")
      .notEmpty()
      .withMessage("Position is required"),
    body("location")
      .notEmpty()
      .withMessage("Location is required"),
  ],
  officerController.registerOfficer
);

router.post(
  "/login",
  [
    body("adharNumber")
      .matches(/^\d{12}$/)
      .withMessage("Aadhar number must be 12 digits"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  officerController.loginOfficer
);

module.exports = router;