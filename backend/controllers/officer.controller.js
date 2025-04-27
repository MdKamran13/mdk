const Officer = require("../models/officer.model");
const { validationResult } = require("express-validator");
const officerService = require("../services/officer.service");

module.exports.registerOfficer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, phoneNumber, age, position, location, adharNumber, password } = req.body;

  const isOfficerExist = await Officer.findOne({ adharNumber });

  if (isOfficerExist) {
    return res.status(400).json({ message: "Officer with this Aadhar number is already registered" });
  }

  const hashPassword = await Officer.hashPassword(password);

  const officer = await officerService.createOfficer({
    firstName,
    lastName,
    phoneNumber,
    age,
    position,
    location,
    adharNumber,
    password: hashPassword,
  });

  const token = officer.generateAuthToken();
  res.status(201).json({ token, officer });
};

module.exports.loginOfficer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { adharNumber, password } = req.body;

  const officer = await Officer.findOne({ adharNumber }).select("+password");

  if (!officer) {
    return res.status(401).json({ message: "Invalid Aadhar number or password" });
  }

  const isMatch = await officer.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Aadhar number or password" });
  }

  const token = officer.generateAuthToken();

  res.cookie("token", token);
  res.status(200).json({ token, officer });
};