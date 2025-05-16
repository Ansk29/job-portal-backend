const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resume: { type: String, required: true,default: "No resume submitted" },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }
}, { timestamps: true });

ApplicationSchema.index({ job: 1, candidate: 1 }, { unique: true });
module.exports = mongoose.model("Application", ApplicationSchema);
