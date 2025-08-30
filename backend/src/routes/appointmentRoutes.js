const express = require("express");
const {
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
    getDoctorAppointments,
    updateAppointmentStatus,
} = require("../controllers/appointmentController.js");

const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Patient Routes
router.post("/book", protect, bookAppointment);
router.get("/my", protect, getMyAppointments);
router.put("/:id/cancel", protect, cancelAppointment);

// Doctor Routes
router.get("/doctor", protect, getDoctorAppointments);
router.put("/:id/status", protect, updateAppointmentStatus);

module.exports = router;
