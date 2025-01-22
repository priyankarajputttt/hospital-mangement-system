const Appointment = require("../models/Appointment");
exports.createAppointment = async (req, res) => {
  try {
    const { patient, doctor, date } = req.body;
    const appointment = new Appointment({ patient, doctor, date });
    await appointment.save();
    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find(req.query).populate(
      "patient doctor"
    );
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });
    res.json({ message: "Appointment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};
