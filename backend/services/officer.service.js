const Officer = require("../models/officer.model");

module.exports.createOfficer = async ({
  firstName,
  lastName,
  phoneNumber,
  age,
  position,
  location,
  adharNumber,
  password,
}) => {
  if (!firstName || !phoneNumber || !adharNumber || !password || !position || !location) {
    throw new Error("All required fields must be provided");
  }

  const officer = await Officer.create({
    firstName,
    lastName: lastName || null, // Optional field
    phoneNumber,
    age,
    position,
    location,
    adharNumber,
    password,
  });

  return officer;
};