const express = require("express");
const {
    getAllDoctors,
    approveDoctor,
    rejectDoctor,
    getAllPatients,
    getPatientById,
    getPatientMedicalHistory,
    getPatientReports,
    getAllAppointments,
    getStats,
} = require("../controllers/adminController.js");

const { protect, authorizeAdmin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Doctor management
router.get("/doctors", protect, authorizeAdmin, getAllDoctors);
router.put("/doctors/:id/approve", protect, authorizeAdmin, approveDoctor);
router.put("/doctors/:id/reject", protect, authorizeAdmin, rejectDoctor);

// Patient management
router.get("/patients", protect, authorizeAdmin, getAllPatients);
router.get("/patients/:id", protect, authorizeAdmin, getPatientById);
router.get("/patients/:id/medical-history", protect, authorizeAdmin, getPatientMedicalHistory);
router.get("/patients/:id/reports", protect, authorizeAdmin, getPatientReports);

// Appointments
router.get("/appointments", protect, authorizeAdmin, getAllAppointments);

// Stats
router.get("/stats", protect, authorizeAdmin, getStats);

module.exports = router;
