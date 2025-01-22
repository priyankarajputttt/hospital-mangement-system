const express = require("express");
const {
  createAppointment,
  getAppointments,
  updateAppointment,
} = require("../controllers/appointmentController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post(
  "/",
  authenticate,
  authorize(["Patient", "Admin"]),
  createAppointment
);
router.get(
  "/",
  authenticate,
  authorize(["Doctor", "Admin", "Patient"]),
  getAppointments
);
router.put(
  "/:id",
  authenticate,
  authorize(["Doctor", "Admin", "Patient"]),
  updateAppointment
);
module.exports = router;
