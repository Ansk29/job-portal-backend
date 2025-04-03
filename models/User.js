const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["candidate", "employer", "admin"], required: true },
  isVerified: { type: Boolean, default: false },  // ✅ New field
  otp: { type: String }, // ✅ Store OTP
  otpExpires: { type: Date } // ✅ OTP Expiry Time
});

module.exports = mongoose.model("User", UserSchema);
