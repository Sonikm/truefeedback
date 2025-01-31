import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prompt =
      "Generate a unique list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should appeal to a diverse audience. Focus on universal themes that encourage friendly interaction, creativity, and curiosity. Avoid repeating questions and steer clear of personal or sensitive topics. Structure the output like this: 'What’s a new skill you'd love to learn?||What’s the best advice you’ve ever received?||If you could live in any fictional world, which would it be and why?'. Make sure each set of questions is distinct, intriguing, and fosters a welcoming conversational environment.";
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const filteredRes = result.response.text();

    return NextResponse.json({ success: true, filteredRes }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
