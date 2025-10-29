const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    await transporter.sendMail({
      from: `"MERN App" <${process.env.EMAIL}>`,
      to: receiverEmail,
      subject: subject,
      html: body,
    });
    console.log(`✅ Email sent successfully to ${receiverEmail}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
