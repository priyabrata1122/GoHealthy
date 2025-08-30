const express = require("express");
const {
    getAllDoctors,
    approveDoctor,
    rejectDoctor,
    getAllPatients,
    getAllAppointments,
    getStats,
} = require("../controllers/adminController.js");
const { protect, authorizeAdmin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/doctors", protect, authorizeAdmin, getAllDoctors);
router.put("/doctors/:id/approve", protect, authorizeAdmin, approveDoctor);
router.put("/doctors/:id/reject", protect, authorizeAdmin, rejectDoctor);
router.get("/patients", protect, authorizeAdmin, getAllPatients);
router.get("/appointments", protect, authorizeAdmin, getAllAppointments);
router.get("/stats", protect, authorizeAdmin, getStats);

module.exports = router;
