const User = require("../models/User.js");

const getProfile = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ success: false, message: "Only patients can access this" });
        }

        const user = await User.findById(req.user._id).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ success: false, message: "Only patients can update profile" });
        }

        const { name, age, gender, phone, address } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, age, gender, phone, address },
            { new: true }
        ).select("-password");

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addMedicalHistory = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ success: false, message: "Only patients can add medical history" });
        }

        const { condition, diagnosisDate, treatment } = req.body;

        const user = await User.findById(req.user._id);
        user.medicalHistory.push({ condition, diagnosisDate, treatment });
        await user.save();

        res.json({ success: true, medicalHistory: user.medicalHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMedicalHistory = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ success: false, message: "Only patients can view medical history" });
        }

        const user = await User.findById(req.user._id).select("medicalHistory");
        res.json({ success: true, medicalHistory: user.medicalHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addReport = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ success: false, message: "Only patients can add reports" });
        }

        const { reportName, reportUrl } = req.body;

        const user = await User.findById(req.user._id);
        user.reports.push({ reportName, reportUrl });
        await user.save();

        res.json({ success: true, reports: user.reports });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getReports = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ success: false, message: "Only patients can view reports" });
        }

        const user = await User.findById(req.user._id).select("reports");
        res.json({ success: true, reports: user.reports });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    addMedicalHistory,
    getMedicalHistory,
    addReport,
    getReports,
};
