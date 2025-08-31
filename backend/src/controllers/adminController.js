const User = require("../models/User.js");
const Appointment = require("../models/Appointment.js");
const sendEmail = require("../utils/sendEmail.js");

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

const approveDoctor = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id);
        if (!doctor || doctor.role !== "doctor") {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        doctor.isApproved = true;
        await doctor.save();

        await sendEmail(
            doctor.email,
            "Doctor Approval - GoHealthy",
            `Hello Dr. ${doctor.name},\n\nYour account has been approved by the admin. You can now accept appointments.\n\n- GoHealthy Team`
        );

        res.json({ success: true, message: "Doctor approved", doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const rejectDoctor = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id);
        if (!doctor || doctor.role !== "doctor") {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        doctor.isApproved = false;
        await doctor.save();

        await sendEmail(
            doctor.email,
            "Doctor Application Rejected - GoHealthy",
            `Hello Dr. ${doctor.name},\n\nWe regret to inform you that your application has been rejected by the admin.\n\n- GoHealthy Team`
        );

        res.json({ success: true, message: "Doctor rejected", doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({ role: "patient" }).select("-password");
        res.json({ success: true, patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await User.findOne({ _id: req.params.id, role: "patient" }).select("-password");
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }
        res.json({ success: true, patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPatientMedicalHistory = async (req, res) => {
    try {
        const patient = await User.findOne({ _id: req.params.id, role: "patient" }).select("name email medicalHistory");
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }
        res.json({ success: true, medicalHistory: patient.medicalHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPatientReports = async (req, res) => {
    try {
        const patient = await User.findOne({ _id: req.params.id, role: "patient" }).select("name email reports");
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        const reportsWithFullUrl = patient.reports.map((report) => ({
            ...report.toObject(),
            reportUrl: `${req.protocol}://${req.get("host")}${report.reportUrl}`
        }));

        res.json({ success: true, reports: reportsWithFullUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

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
    getPatientById,
    getPatientMedicalHistory,
    getPatientReports,
    getAllAppointments,
    getStats,
};
