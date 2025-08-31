const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");

const createPrescription = async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ success: false, message: "Only doctors can create prescriptions" });
        }

        const { appointmentId, medicines, notes } = req.body;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        if (appointment.doctor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized for this appointment" });
        }

        const prescription = await Prescription.create({
            appointment: appointmentId,
            doctor: req.user._id,
            patient: appointment.patient,
            medicines,
            notes,
        });

        res.json({ success: true, prescription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMyPrescriptions = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ success: false, message: "Only patients can view prescriptions" });
        }

        const prescriptions = await Prescription.find({ patient: req.user._id })
            .populate("doctor", "name specialization")
            .populate("appointment", "date status");

        res.json({ success: true, prescriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDoctorPrescriptions = async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ success: false, message: "Only doctors can view their prescriptions" });
        }

        const prescriptions = await Prescription.find({ doctor: req.user._id })
            .populate("patient", "name email")
            .populate("appointment", "date status");

        res.json({ success: true, prescriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createPrescription,
    getMyPrescriptions,
    getDoctorPrescriptions,
};
