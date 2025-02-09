// /pages/api/get-disease-prediction.ts
import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import multer from "multer";  // Ensure this import is correct 

// Configure Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" }); 

// Better logging with error handling
if (!process.env.GEMINI_API_KEY) {
    console.error("Warning: GEMINI_API_KEY is not set in environment variables");
} else {
    console.log("OpenAI API Key is configured:", process.env.GEMINI_API_KEY.slice(0, 10) + "...");  
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      try {
        const { symptoms } = req.body;
  
        // Start a chat session
        const chatSession = model.startChat({
          generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
          },
          history: [],
        });
  
        // Get response from Gemini
        const result = await chatSession.sendMessage(
          `You are a medical assistant. Analyze these symptoms and provide a possible disease diagnosis: ${symptoms}`
        );
  
        const responseText = result.response.text();
  
        // Process response
        res.status(200).json({
          disease: extractDiseaseName(responseText),
          description: extractDescription(responseText),
        });
      } catch (error) {
        console.error("Error in Gemini API:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }; 

// Helper function to process uploaded reports (OCR or text parsing)
function processReports(reports: Express.Multer.File[]): string {
    return "Processed medical report text here";
}

// Helper functions to extract disease name and description from GEMINI response
function extractDiseaseName(response: string): string {
    return response.split("\n")[0];
}

function extractDescription(response: string): string {
    return response.split("\n")[1];
} 