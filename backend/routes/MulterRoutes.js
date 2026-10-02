const express=require("express")
const { PDFParse } = require("pdf-parse");
const fs=require("fs")
const userMiddleware=require("../middlewares/userMiddleware")
const router=express.Router()

const upload=require("../middlewares/upload");
const File=require("../models/filemodel")


router.post("/upload", userMiddleware,upload.single("file"),async(req,res)=>{

    try{
        const {targetPosition,jobdescription}=req.body;

        console.log("file",req.file)

const databuffer=fs.readFileSync(req.file.path)
  const parser=new PDFParse({
    data:databuffer
  })


  const data=await parser.getText();
  console.log(data.text)

    const file=await File.create({
        originalname:req.file.originalname,
        filename:req.file.filename,
        filepath:req.file.path,
        filesize:req.file.size,
        text:data.text,
        targetPosition,
        jobdescription,
        user:req.user._id,
    
    })

    console.log(req.file)

    return res.json({msg:"file uploaded succesfully",
file:file

    })

    }catch(error){
    return res.status(500).json({msg:"error reading the pdf",error:error.message})
}
})







module.exports=router;
