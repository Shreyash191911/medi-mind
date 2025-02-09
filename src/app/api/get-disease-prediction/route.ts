import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing Gemini API Key");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(request: NextRequest) { 
  // Use Clerk's getAuth as documented
  const { userId } = getAuth(request); 

  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const symptoms = formData.get("symptoms")?.toString() || "";

    if (!symptoms) {
      return NextResponse.json(
        { error: "No symptoms provided" },
        { status: 400 }
      );
    }

    const prompt = `As a medical assistant, analyze these symptoms and provide a detailed response with possible disease diagnosis, description, and medical advice.

Symptoms: ${symptoms}`;

    const result = await model.generateContent(prompt);
    // Await the response property and then await the text() call
    const response = await result.response;
    const responseText = await response.text();

    return NextResponse.json({
      response: responseText
    });
  } catch (error) {
    console.error("Error in Gemini API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
