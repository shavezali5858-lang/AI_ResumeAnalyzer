const express=require("express")
const dotenv=require("dotenv")

dotenv.config();
const PORT=process.env.PORT||8000;
const Multerroutes=require("./routes/MulterRoutes")

const analyzeRoute=require("./routes/Analyze")
const mongoose=require("mongoose")
const session=require("express-session")
const cors=require("cors")


const Authroutes=require("./routes/Authroutes")
const app=express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());


app.use(
    session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60
        }
    })
);

app.get("/",(req,res)=>{
    res.send("server is working")
})


app.use("/api",Multerroutes)
app.use("/api/auth",Authroutes)

app.use((err,req,res,next)=>{
    console.log(err.message)
    return res.status(400).json({msg:err.message})
})

app.use("/api",analyzeRoute)




mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err))


app.listen(PORT,()=>console.log(`server started at port ${PORT}`))

