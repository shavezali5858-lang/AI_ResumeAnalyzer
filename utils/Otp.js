const nodemailer=require("nodemailer")

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})



const Sendotp=async(email,otp)=>{
    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:"verify your email",
        text:`your otp for verification is ${otp}. It will expire in 10 minutes`
    })
}




const sendResetemail=async(email,resetToken)=>{
    try{

await transporter.sendMail({
    from:process.env.EMAIL_USER,
    to:email,
    subject:"Reset your ResumeAI password",
    html:`

<p>Reset your password</p>

<p>click the link below to reset your password</p>
   <a
        href="http://localhost:5173/reset-password/${resetToken}"
        style="
          display:inline-block;
          padding:12px 20px;
          background:#4f46e5;
          color:white;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>

      <p>If you didn't request this, you can ignore this email.</p>

    `
   
})
 return res.status(200).json({msg:"Reset link sent!"})


    }catch(error){
        return res.status(500).json({msg:error.message})
    }
}


module.exports={
    Sendotp,
    sendResetemail
}
