require("dotenv").config();
const express=require("express")


const userMiddleware=require("../middlewares/userMiddleware")
const   File=require("../models/filemodel")
const { Type } = require("@google/genai");
const gemini=require("../config/gemini")
// const openAi=require("../config/openai")

const router=express.Router()



router.post("/analyze",async(req,res)=>{
    try{

    const {_id}=req.body;

    //  console.log("FILE ID:", _id);
    //     console.log("REQ.USER:", req.user);

    if(!_id){
        return res.status(500).json({msg:"FILEID is required!"})
    }

    const file=await File.findById(_id)
        // _id:fileId,
        // user:req.user._id
    

    if(!file){
        return res.status(400).json({msg:"File not found!"})
    }


    
// openai.responses.create
// console.log("BEFORE GEMINI");

const prompt = `
You are an expert ATS resume analyzer.

Analyze the resume for the target position:
${file.targetPosition}

JOB DESCRIPTION:
${file.jobDescription || "No job description was provided."}

RESUME:
${file.text}

Compare the resume against the job description and identify:
- skills that match
- skills/keywords missing from the resume
- strengths relevant to the job
- weaknesses relevant to the job
- actionable suggestions to improve the resume for this specific job

Return ONLY valid JSON in exactly this format:

{
  "score": 0,
  "matchedKeywords": [],
  "missingKeywords": [],
  "missingSkills":[],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Rules:
- score must be a number from 0 to 100
- matchedKeywords must be an array of strings
- missingKeywords must be an array of strings
- strengths must be an array of strings
- weaknesses must be an array of strings
- suggestions must be an array of strings
- Only include keywords/skills that are relevant to the target position or job description
- Do not make assumptions about information that is not present in the resume
- Do not include markdown
- Do not include explanations outside the JSON
`;

console.log("PROMPT SENT TO GEMINI:", prompt);
const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,

    config: {
        responseMimeType: "application/json",

        responseSchema: {
            type: Type.OBJECT,

            properties: {
                score: {
                    type: Type.NUMBER
                },

                matchedKeywords: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                },

                missingKeywords: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                },

                missingSkills: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                },

                strengths: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                },

                weaknesses: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                },

                suggestions: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                }
            },

            required: [
                "score",
                "matchedKeywords",
                "missingKeywords",
                "missingSkills",
                "strengths",
                "weaknesses",
                "suggestions"
            ]
        }
    }
});
 console.log("AI RESPONSE:", response.text);

const aiResult = JSON.parse(response.text);

  

       

        return res.status(200).json({
            msg: "GEMINI-AI connected successfully",
            aiResponse: aiResult
        });
 } catch (error) {

        console.log("AI ERROR:", error);

        return res.status(500).json({
            msg: "AI request failed",
            error: error.message
        });
    }


    
})
    



module.exports=router;

