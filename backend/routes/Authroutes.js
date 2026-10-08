const express=require("express")
const {registerUser,Loginuser,forgetpassword,resetPassword,Verifyemail,resendOtp,logoutuser}=require("../controllers/Authcontrollers")
const User = require("../models/User")

const userMiddleware=require("../middlewares/userMiddleware")


const router=express.Router()

router.post("/register",registerUser)
router.post("/login",Loginuser)

router.get("/profile",userMiddleware,async(req,res)=>{
    const user=await User.findById(req.session.userId)
    
    return res.json({
        name: user.name,
        email: user.email
    });
})


// router.get("/logout",(req,res)=>{
//     req.session.destroy((err)=>{
//         if(err){
//             return res.status(500).json({msg:"logout failed"})
//         }

//         return res.json({msg:"LOgged out successfully"})
//     })
// })


router.post("/forget-password",forgetpassword)

router.post("/reset-password/:token",resetPassword)

router.post("/verify-email",Verifyemail)
router.post("/resend-otp",resendOtp)

router.post("/logout",logoutuser)

router.get("/me", (req, res, next) => {

  console.log("COOKIE HEADER:", req.headers.cookie);
  console.log("SESSION ID:", req.sessionID);
  console.log("ME SESSION:", req.session);

  next();

}, userMiddleware, (req, res) => {

  return res.status(200).json({
    name: req.user.name,
    email: req.user.email
  });

});

module.exports=router;