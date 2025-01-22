const express = require("express");
const {
  getPatientRecords,
  updatePatientRecords,
  addPatientRecord,
  deletePatientRecord,
} = require("../controllers/patientController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// Add a new record for a patient
router.post(
  "/:id/records",
  authenticate,
  authorize(["Doctor", "Admin"]),
  addPatientRecord
);

// Get all records for a patient
router.get(
  "/:id/records",
  authenticate,
  authorize(["Patient", "Doctor", "Admin"]),
  getPatientRecords
);

// Update a specific record for a patient
router.put(
  "/:id/records/:recordId",
  authenticate,
  authorize(["Doctor", "Admin"]),
  updatePatientRecords
);

// Delete a specific record for a patient
router.delete(
  "/:id/records/:recordId",
  authenticate,
  authorize(["Doctor", "Admin"]),
  deletePatientRecord
);

module.exports = router;
