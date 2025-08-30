const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/User.js");
const connectDB = require("./src/config/db.js");

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("Admin already exists:", existingAdmin.email);
            process.exit();
        }

        const adminUser = await User.create({
            name: process.env.ADMIN_NAME || "Admin",
            email: process.env.ADMIN_EMAIL || "admin@example.com",
            password: process.env.ADMIN_PASSWORD || "admin@1234",
            role: "admin",
        });

        console.log("Admin user created:", adminUser.email);
        process.exit();
    } catch (error) {
        console.error("Error seeding admin:", error.message);
        process.exit(1);
    }
};

seedAdmin();
