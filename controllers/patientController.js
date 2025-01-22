const Patient = require("../models/Patient");
exports.getPatientRecords = async (req, res) => {
  console.log("Fetching patient records for user ID:", req.params.id);
  try {
    const patient = await Patient.findOne({ user: req.params.id }).populate(
      "user"
    );
    if (!patient) {
      console.error("Patient not found for user ID:", req.params.id);
      return res.status(404).json({ error: "Patient not found" });
    }
    console.log(
      "Patient records fetched successfully for user ID:",
      req.params.id
    );
    res.json(patient.records);
  } catch (error) {
    console.error("Error fetching patient records:", error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// Add a new record for a patient
exports.addPatientRecord = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.params.id });
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    patient.records.push(req.body);
    await patient.save();

    console.log(`Added new record for patient: ${req.params.id}`);
    res
      .status(201)
      .json({ message: "Record added successfully", records: patient.records });
  } catch (error) {
    console.error("Error adding patient record:", error);
    res.status(500).json({ error: "Failed to add patient record" });
  }
};

exports.updatePatientRecords = async (req, res) => {
  try {
    const { id, recordId } = req.params;

    const patient = await Patient.findOne({ user: id });
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const record = patient.records.id(recordId);
    if (!record) return res.status(404).json({ error: "Record not found" });

    Object.assign(record, req.body);
    await patient.save();

    console.log(`Updated record ${recordId} for patient: ${id}`);
    res.json({ message: "Record updated successfully", record });
  } catch (error) {
    console.error("Error updating patient record:", error);
    res.status(500).json({ error: "Failed to update patient record" });
  }
};

exports.deletePatientRecord = async (req, res) => {
  try {
    const { id, recordId } = req.params;

    const patient = await Patient.findOne({ user: id });
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const record = patient.records.id(recordId);
    if (!record) return res.status(404).json({ error: "Record not found" });

    record.remove();
    await patient.save();

    console.log(`Deleted record ${recordId} for patient: ${id}`);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient record:", error);
    res.status(500).json({ error: "Failed to delete patient record" });
  }
};
