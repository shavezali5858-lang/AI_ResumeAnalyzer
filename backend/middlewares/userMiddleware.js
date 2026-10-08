const express=require("express")
const User=require("../models/User")


const userMiddleware=async(req,res,next)=>{
    try{

        console.log("ME SESSION:", req.session);
        console.log("ME USER ID:", req.session.userId);
       

    if(!req.session.userId){
        return res.status(401).json({msg:"please login first"})
    }


     const user = await User.findById(req.session.userId);

    if (!user) {

      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        }
      });

      return res.status(401).json({
        msg: "Session expired. Please login again."
      });
    }

    // Store user for later controllers
    req.user = user;

    next();

  } catch (error) {


    console.log(error);

    return res.status(500).json({
      msg: "Server error"
    });
  }
}

module.exports=userMiddleware;