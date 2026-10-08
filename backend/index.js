const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

console.log("MONGO URI loaded:", !!process.env.MONGO_URI);
const express=require("express")



const PORT=process.env.PORT||8000;
const Multerroutes=require("./routes/MulterRoutes")

const analyzeRoute=require("./routes/Analyze")
const mongoose=require("mongoose")
const session=require("express-session")
const MongoStore = require("connect-mongo").default;
const cors=require("cors")


const Authroutes=require("./routes/Authroutes")
const app=express()

app.set("trust proxy", 1);

app.use(cors({
    origin:[
         "http://localhost:5173",
        "https://ai-resume-analyzer-nx5g.onrender.com"

    ],

    credentials: true
}));
app.use(express.json());



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),

    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000
    }
}));

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
// .catch((err)=>console.log(err))
.catch((err)=>console.log("mongo error",err))

app.listen(PORT,()=>console.log(`server started at port ${PORT}`))

