const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const patientRoutes = require("./routes/patientRoutes.js");
const prescriptionRoutes = require("./routes/prescriptionRoutes.js");
// const { errorHandler } = require("./middlewares/errorMiddleware.js");

dotenv.config();

//MongoDB Connection
connectDB();

const app = express();

// Middlewares
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: [
    "https://go-healthy-gamma.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser());

// Write stream to record the log files
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "log.txt"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use("/uploads", express.static("uploads"));

// app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// Test API
app.get("/", (req, res) => {
  res.send("Healthcare API is running...");
});

// Error handler
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
