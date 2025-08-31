const Appointment = require("../models/Appointment.js");
const User = require("../models/User.js");
const sendEmail = require("../utils/sendEmail.js");
const bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, notes } = req.body;

        if (req.user.role !== "patient") {
            return res.status(403).json({ success: false, message: "Only patients can book appointments" });
        }

        if (!doctorId || !date) {
            return res.status(400).json({ success: false, message: "Doctor and date are required" });
        }

        const appointmentDate = new Date(date);

        if (appointmentDate < new Date()) {
            return res.status(400).json({ success: false, message: "Cannot book an appointment in the past" });
        }

        const doctor = await User.findOne({ _id: doctorId, role: "doctor", isApproved: true });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found or not approved" });
        }

        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            date: appointmentDate,
            status: { $in: ["pending", "confirmed"] }
        });

        if (existingAppointment) {
            return res.status(400).json({ success: false, message: "Doctor is not available at this time" });
        }

        const patientOverlap = await Appointment.findOne({
            patient: req.user._id,
            date: appointmentDate,
            status: { $in: ["pending", "confirmed"] }
        });

        if (patientOverlap) {
            return res.status(400).json({ success: false, message: "You already have an appointment at this time" });
        }

        const appointment = await Appointment.create({
            doctor: doctorId,
            patient: req.user._id,
            date: appointmentDate,
            notes,
        });

        await sendEmail(
            req.user.email,
            "Appointment Confirmation - GoHealthy",
            `Hello ${req.user.name},\n\nYour appointment with Dr. ${doctor.name} has been booked successfully for ${date}.\n\n- GoHealthy Team`
        );

        await sendEmail(
            doctor.email,
            "New Appointment Booked - GoHealthy",
            `Hello ${doctor.name},\n\nYou have a new appointment with patient ${req.user.name} on ${date}.\n\n- GoHealthy Team`
        );

        res.status(201).json({ success: true, appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user._id })
            .populate("doctor", "name email specialization")
            .sort({ date: 1 });

        res.json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ success: false, message: "Only patients can cancel appointments" });
        }

        let appointment = await Appointment.findById(req.params.id).populate("patient doctor");

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        if (appointment.patient._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to cancel this appointment" });
        }

        appointment.status = "cancelled";
        await appointment.save();

        // ✅ Notify doctor that patient canceled
        await sendEmail(
            appointment.doctor.email,
            "Appointment Cancelled - GoHealthy",
            `Hello Dr. ${appointment.doctor.name},\n\nYour appointment with patient ${appointment.patient.name} on ${appointment.date} has been cancelled by the patient.\n\n- GoHealthy Team`
        );

        // ✅ Notify patient for confirmation
        await sendEmail(
            appointment.patient.email,
            "Appointment Cancelled - GoHealthy",
            `Hello ${appointment.patient.name},\n\nYour appointment with Dr. ${appointment.doctor.name} on ${appointment.date} has been successfully cancelled.\n\n- GoHealthy Team`
        );

        res.json({ success: true, message: "Appointment cancelled successfully", appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDoctorAppointments = async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ success: false, message: "Only doctors can view their appointments" });
        }

        const appointments = await Appointment.find({ doctor: req.user._id })
            .populate("patient", "name email")
            .sort({ date: 1 });

        res.json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ success: false, message: "Only doctors can update appointment status" });
        }

        const { status } = req.body;

        let appointment = await Appointment.findById(req.params.id).populate("patient doctor");

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        if (appointment.doctor._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update this appointment" });
        }

        appointment.status = status || appointment.status;
        await appointment.save();

        await sendEmail(
            appointment.patient.email,
            "Appointment Status Update - GoHealthy",
            `Hello ${appointment.patient.name},\n\nYour appointment with Dr. ${appointment.doctor.name} on ${appointment.date} is now marked as: ${appointment.status}.\n\n- GoHealthy Team`
        );

        res.json({ success: true, appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
    getDoctorAppointments,
    updateAppointmentStatus,
};
