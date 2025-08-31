const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema(
    {
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        medicines: [
            {
                name: { type: String, required: true },
                dosage: { type: String, required: true },
                duration: { type: String, required: true }, // e.g. "5 days"
                instructions: { type: String }, // optional
            },
        ],
        notes: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Prescription", PrescriptionSchema);
