// models/Patient.js
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
    unique: true, // Ensures one-to-one relationship
  },
  records: [
    {
      description: { type: String },
      date: { type: Date },
    },
  ],
});

module.exports = mongoose.model("Patient", patientSchema);
