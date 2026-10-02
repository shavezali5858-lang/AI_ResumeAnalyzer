const mongoose=require("mongoose")

const fileupload= new mongoose.Schema({
    originalname:{
        type:String,
        required:true
    },

    filename:{
    type:String,
    required:true
    },

    filepath:{
        type:String,
        required:true
    },

    filesize:{
        type:Number,
        required:true
    },
    uploadTime :{
        type:Date,
        default:Date.now()
    },
    text:{
        type:String,
        required:true
    },

targetPosition:{
    type:String,
    required:true
},
jobdescription:{
    type:String,
    required:false
},
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})


const File=mongoose.model("File",fileupload)


module.exports=File;