const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html = null) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"GoHealthy Care" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html: html || text,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Email error:", error.message);
    }
};

module.exports = sendEmail;
