const User=require("../models/User")
const bcrypt=require("bcrypt")
const crypto=require("crypto")
// const jwt=require("jsonwebtoken")
const {Sendotp,sendResetemail}=require("../utils/Otp")



const registerUser=async(req,res)=>{

    try{
    const {name,email,password}=req.body;

     if(!name ||!email ||!password){
        return res.status(404).json({msg:"all fields are mandatory!"})
     }
    



    if(password.length<6){
        return res.status(400).json({msg:"password must be atleast 6 characters"})
    }


const duplicateemail=await User.findOne({email})
if(duplicateemail){
    return res.status(400).json({msg:"Email is already registered!"})
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        msg: "Please enter a valid email"
    });
}


    const Hashedpassword=await bcrypt.hash(password,10)


    const otp=Math.floor(100000+Math.random()*900000).toString();
    const OTPexpires=Date.now()+10*60*1000;
     await Sendotp(email,otp);

     const user=await User.create({
        name,
        email,
        password:Hashedpassword,
        EmailOtp:otp,
        otpExpires:OTPexpires
     })


    
     return res.json({msg:"OTP sent successfully to your email"})
    //   return res.json({msg:"user registered successfully!"})
    // }catch(error){
    //     return res.status(501).json({msg:"Cannot generate OTP Try again later"})
    // }

    // }
    }catch(error){
    console.log("REGISTER ERROR:", error);

    return res.status(501).json({
        msg: "Cannot generate OTP Try again later"
    });
}
}



const Verifyemail=async(req,res)=>{

    const {email,otp}=req.body;

    const user =await User.findOne({email})
    if(!email){
        return res.status(404).json({msg:"User does not exist"})
    }

    if(user.isVerified){
        return res.status(400).json({msg:"user is already verified"})
    }


    if(user.EmailOtp!=otp){
        return res.status(404).json({msg:"Invalid otp"})
    }

    if(user.otpExpires<Date.now()){
        return res.status(404).json({msg:"OTP is expired"})
    }



    user.isVerified=true;
    user.EmailOtp=undefined
    user.otpExpires=undefined

    await user.save();

    

    return res.status(200).json({msg:"User verified succesfully"})

}


const resendOtp = async(req,res)=>{
    const {email}=req.body;
if(!email){
        return res.json({msg:"User does not exist"})
    }

    if(user.isVerified){
        return res.status(400).json({msg:"user is already verified"})
    }


     const otp=Math.floor(100000+Math.random()*900000).toString();
    const OTPexpires=Date.now()+10*60*1000;

    user.EmailOtp=otp;
    user.otpExpires=OTPexpires


    await user.save();
    await sendOTP(email,otp)

    return res.status(200).json({msg:"New otp sent successfully"})

}






    

const Loginuser=async(req,res)=>{
    try{
    const {email,password}=req.body
    const userlogin=await User.findOne({email})

    if(!userlogin){
        return res.status(404).json({msg:"EMAIL NOT FOUND! "})
    }

const ispasswordcorrect=await bcrypt.compare(password,userlogin.password)

if(!ispasswordcorrect){
    return res.status(404).json({msg:"PASSWORD IS INCORRECT"})
}
req.session.userId=userlogin._id;
 console.log("LOGIN SESSION:", req.session);
console.log("LOGIN USER ID:", req.session.userId);
req.session.save((err) => {
  if (err) {
    console.log("SESSION SAVE ERROR:", err);
    return res.status(500).json({ msg: "Session save failed" });
  }

  console.log("SESSION SAVED:", req.session);
  console.log("SET-COOKIE:", res.getHeader("Set-Cookie"));

  return res.status(200).json({
    msg: "LOGIN SUCCESSFULLY!"
  });
});
//  return res.status(200).json({msg:"LOGIN SUCCESSFULLY!"})

}catch(error){
      console.log("LOGIN ERROR:", error);
    return res.status(500).json({msg:"Log in failed!",error:error.message})
}


}



const forgetpassword=async(req,res)=>{
    const {email}=req.body

    const user=await User.findOne({email})

    if(!user){
        return res.status(400).json({msg:"Email not found"})
    }

const resetToken=crypto.randomBytes(32).toString("hex")
user.resetToken=resetToken


user.resetTokenExpiry=Date.now()+15*60*1000

    await user.save();
    await sendResetemail(email,resetToken);

    return res.json({
        msg: "Reset link sent!",
        resetToken
    });
};




const resetPassword=async(req,res)=>{
    const {token}=req.params
    const {password}=req.body
    console.log("TOKEN",token)

    const user=await User.findOne({
        resetToken:token,
        resetTokenExpiry:{$gt:Date.now()}
    })

    console.log("USER FOUND",user)
   

 if(!user){
        return res.status(400).json({msg:"Invalid or Token got expired"})
    }
      console.log("EXPIRY:", user.resetTokenExpiry);
    console.log("CURRENT TIME:", new Date());


    if(!password ||password.length<6){
        return res.status(400).json({msg:"password must be atleast 6 characters"})
    }
const Hashedpasword=await bcrypt.hash(password,10)
user.password=Hashedpasword


user.resetToken=undefined
user.resetTokenExpiry=undefined
await user.save()


return res.json({msg:"password reset successfully"})


}


const logoutuser=async(req,res)=>{

    req.session.destroy((err)=>{
        if(err){
            return res.status(404).json({msg:"Logout Failed"})
        }  

        res.clearCookie("connect.sid");
        console.log("logged out")

        return res.status(200).json({msg:"Logged out successfully"})
    })

    
}













module.exports={
    registerUser,
    Loginuser,
    forgetpassword,
    resetPassword,
    Verifyemail,
    resendOtp,
    logoutuser
}
