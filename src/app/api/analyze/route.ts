import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Process the uploaded file and return a response
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Here, you’d call your AI model or API
  const result = { analysis: "Sample AI result" };

  return NextResponse.json(result);
} 