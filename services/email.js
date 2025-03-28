const nodemailer = require("nodemailer");
const config = require("config");

const sendOtpByEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.get("email.user"),
        pass: config.get("email.pass"),
      },
    });

    const mailOptions = {
      from: config.get("email.user"),
      to,
      subject: "Sizning OTP kodingiz",
      text: `Sizning tasdiqlash kodingiz: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email yuborishda xatolik:", error);
    return false;
  }
};

module.exports = { sendOtpByEmail };
