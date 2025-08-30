const User = require("../models/User.js");

// Get logged-in doctor's profile
const getMyDoctorProfile = async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const doctor = await User.findById(req.user.id).select("-password");
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        res.json({ success: true, doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all approved doctors (patients can see them)
const getDoctors = async (req, res) => {
    try {
        const { specialization } = req.query;
        const filter = { role: "doctor", isApproved: true };
        if (specialization) filter.specialization = specialization;

        const doctors = await User.find(filter).select("-password");
        res.json({ success: true, doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update doctor profile (doctor only)
const updateDoctorProfile = async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const updates = req.body;
        const doctor = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");

        res.json({ success: true, message: "Profile updated", doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: approve doctor
// const approveDoctor = async (req, res) => {
//     try {
//         const doctor = await User.findById(req.params.id);
//         if (!doctor || doctor.role !== "doctor") {
//             return res.status(404).json({ success: false, message: "Doctor not found" });
//         }

//         doctor.isApproved = true;
//         await doctor.save();

//         res.json({ success: true, message: "Doctor approved successfully", doctor });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

module.exports = { getDoctors, updateDoctorProfile, getMyDoctorProfile };
