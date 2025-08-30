const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

//General Auth Middleware
const protect = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Not authorized, invalid token" });
    }
};

// Admin Middleware
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).json({ success: false, message: "Access denied: Admins only" });
};

module.exports = { protect, authorizeAdmin };
