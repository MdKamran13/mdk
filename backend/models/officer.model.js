const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const officerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/ 
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  position: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  adharNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{12}$/ 
  }
}, { timestamps: true });

officerSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

officerSchema.methods.comparePassword =  async function (password){
   const officer = await this.model('Officer').findById(this._id).select('+password');
   return await bcrypt.compare(password, officer.password);
}

officerSchema.statics.hashPassword = async(password) =>{
    return await bcrypt.hash(password,10);
}

const Officer = mongoose.model('Officer', officerSchema);

module.exports = Officer;
