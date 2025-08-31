const express = require("express");
const {
    getProfile,
    updateProfile,
    addMedicalHistory,
    getMedicalHistory,
    addReport,
    getReports,
} = require("../controllers/patientController.js");

const { protect } = require("../middlewares/authMiddleware.js");
const upload = require("../middlewares/uploadMiddleware.js");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.post("/medical-history", protect, addMedicalHistory);
router.get("/medical-history", protect, getMedicalHistory);

router.post("/reports", protect, upload.single("reportFile"), addReport);
router.get("/reports", protect, getReports);

module.exports = router;
