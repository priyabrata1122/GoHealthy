const jwt = require("jsonwebtoken");

const generateToken = (res, userId, role) => {
    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // Set token
    res.cookie("token", token, {
        httpOnly: true,        // prevents JS access (secure)
        secure: process.env.NODE_ENV === "production", // only https in prod
        sameSite: "none",    // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};

module.exports = generateToken;
