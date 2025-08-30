// backend/src/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["patient", "doctor", "admin"],
            default: "patient"
        },

        phone: String,
        profileImage: String,

        // Patient-specific
        age: Number,
        gender: { type: String, enum: ["male", "female", "other"] },
        address: String,

        medicalHistory: [
            {
                condition: String,
                diagnosisDate: Date, // more accurate than just "year"
                treatment: String,
            },
        ],

        reports: [
            {
                reportName: String,
                reportUrl: String, // instead of just `url`, more descriptive
                date: { type: Date, default: Date.now }, // auto-set upload time
            },
        ],

        // Doctor-specific
        specialization: String,
        experience: Number,
        consultationFee: Number,
        availability: [
            {
                day: String,
                slots: [String],
            },
        ],
        isApproved: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
