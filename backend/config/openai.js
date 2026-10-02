const AI=require("openai")

const openai=new AI({
    apiKey:process.env.OPENAI_API_KEY
})

module.exports=openai;
