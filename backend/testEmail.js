require("dotenv").config();
const nodemailer = require("nodemailer");

async function testEmail() {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,          // ✅ Use TLS instead of SSL
            secure: false,      // STARTTLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"GoHealthy App" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,  // send to yourself
            subject: "✅ Test Email from GoHealthy",
            text: "This is a test email to confirm Nodemailer is working with Gmail SMTP.",
        });

        console.log("📩 Test Email Sent: ", info.messageId);
    } catch (error) {
        console.error("❌ Email send failed:", error.message);
    }
}

testEmail();
