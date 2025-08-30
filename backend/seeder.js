const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./src/models/User.js");
const connectDB = require("./src/config/db.js");

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // check if admin already exists
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("Admin already exists:", existingAdmin.email);
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin@123", salt);

        const adminUser = await User.create({
            name: "Main Admin",
            email: "admin@example.com",
            password: hashedPassword,
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
