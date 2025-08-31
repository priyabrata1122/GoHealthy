const express = require("express");
const {
    createPrescription,
    getMyPrescriptions,
    getDoctorPrescriptions,
} = require("../controllers/prescriptionController.js");

const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Doctor create prescription
router.post("/", protect, createPrescription);

//Patient views own prescription
router.get("/my", protect, getMyPrescriptions);

// Doctor views his all issued prescription 
router.get("/doctor", protect, getDoctorPrescriptions);

module.exports = router;
