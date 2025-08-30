const User = require("../models/User.js");
const Appointment = require("../models/Appointment.js");

// Get all doctors (filter by approval status if needed)
const getAllDoctors = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = { role: "doctor" };

        if (status === "approved") filter.isApproved = true;
        if (status === "pending") filter.isApproved = false;

        const doctors = await User.find(filter).select("-password");
        res.json({ success: true, doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Approve doctor
const approveDoctor = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id);
        if (!doctor || doctor.role !== "doctor") {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        doctor.isApproved = true;
        await doctor.save();

        res.json({ success: true, message: "Doctor approved", doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Reject doctor
const rejectDoctor = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id);
        if (!doctor || doctor.role !== "doctor") {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        doctor.isApproved = false;
        await doctor.save();

        res.json({ success: true, message: "Doctor rejected", doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({ role: "patient" }).select("-password");
        res.json({ success: true, patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("doctor", "name email specialization")
            .populate("patient", "name email");
        res.json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get system stats
const getStats = async (req, res) => {
    try {
        const totalPatients = await User.countDocuments({ role: "patient" });
        const totalDoctors = await User.countDocuments({ role: "doctor" });
        const pendingDoctors = await User.countDocuments({ role: "doctor", isApproved: false });
        const totalAppointments = await Appointment.countDocuments();

        res.json({
            success: true,
            stats: {
                totalPatients,
                totalDoctors,
                pendingDoctors,
                totalAppointments,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllDoctors,
    approveDoctor,
    rejectDoctor,
    getAllPatients,
    getAllAppointments,
    getStats,
};
