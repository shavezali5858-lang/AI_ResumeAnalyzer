
// const {Resend}=require("resend")


// const resend = new Resend(process.env.RESEND_API_KEY);
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const Sendotp = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    text: `Your OTP for verification is ${otp}. It will expire in 10 minutes.`,
  });
};

const sendResetemail = async (email, resetToken) => {
  await transporter.sendMail({
    from:process.env.EMAIL_USER,
    to: email,
    subject: "Reset your ResumeAI password",
    html: `
      <p>Reset your password</p>
      <p>Click below to reset your password:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">
        Reset Password
      </a>
      <p>This link will expire in 15 minutes.</p>
      <p>If you didn't request this, you can ignore this email.</p>
    `,
  });
};




// const Sendotp = async (email, otp) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "AI Resume <onboarding@resend.dev>",
//       to: email,
//       subject: "Verify your email",
//       text: `Your OTP for verification is ${otp}. It will expire in 10 minutes.`
//     });

//     if (error) {
//       console.error("RESEND OTP ERROR:", error);
//       throw new Error(error.message || "Failed to send OTP email");
//     }

//     console.log("OTP EMAIL ACCEPTED BY RESEND:", data?.id);
//     return data;
//   } catch (error) {
//     console.error("OTP EMAIL FAILED:", error.message);
//     throw error;
//   }
// };





// const sendResetemail = async (email, resetToken) => {
//     await resend.emails.send({
//         from: "AI Resume <onboarding@resend.dev>",
//         to: email,
//         subject: "Reset your ResumeAI password",
//         html: `
//             <p>Reset your password</p>

//             <p>Click the link below to reset your password:</p>

//             <a
//                 href="${process.env.FRONTEND_URL}/reset-password/${resetToken}"
//                 style="
//                     display:inline-block;
//                     padding:12px 20px;
//                     background:#4f46e5;
//                     color:white;
//                     text-decoration:none;
//                     border-radius:6px;
//                 "
//             >
//                 Reset Password
//             </a>

//             <p>This link will expire in 15 minutes.</p>

//             <p>If you didn't request this, you can ignore this email.</p>
//         `
//     });
// };

module.exports={
    Sendotp,
    sendResetemail
}
