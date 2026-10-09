
// const {Resend}=require("resend")


// const resend = new Resend(process.env.RESEND_API_KEY);
const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, textContent, htmlContent }) => {
const response = await fetch("https://api.brevo.com/v3/smtp/email", {
method: "POST",
headers: {
accept: "application/json",
"api-key": process.env.BREVO_API_KEY,
"content-type": "application/json",
},
body: JSON.stringify({
sender: {
name: "AI Resume",
email: process.env.EMAIL_USER,
},
to: [{ email: to }],
subject,
...(textContent && { textContent }),
...(htmlContent && { htmlContent }),
}),
});

const result = await response.json();

if (!response.ok) {
throw new Error(`Brevo API error ${response.status}: ${JSON.stringify(result)}`);
}

return result;
};

const Sendotp = async (email, otp) => {
return sendEmail({
to: email,
subject: "Verify your email",
textContent: `Your OTP for verification is ${otp}. It will expire in 10 minutes.`,
});
};

const sendResetemail = async (email, resetToken) => {
return sendEmail({
to: email,
subject: "Reset your ResumeAI password",
htmlContent: `       <p>Reset your password</p>       <p>Click below to reset your password:</p>       <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">
        Reset Password       </a>       <p>This link will expire in 15 minutes.</p>       <p>If you didn't request this, you can ignore this email.</p>
    `,
});
};

module.exports = { Sendotp,sendResetemail}




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
