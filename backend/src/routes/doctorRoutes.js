const express = require("express");
const { getDoctors, updateDoctorProfile, getMyDoctorProfile } = require("../controllers/doctorController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", getDoctors);
router.get("/profile", protect, getMyDoctorProfile);
router.put("/profile", protect, updateDoctorProfile);
// router.put("/:id/approve", protect, approveDoctor);

module.exports = router;
