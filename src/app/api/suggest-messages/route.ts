import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themens that encourage friendly inetraction. For example, your output should be structured like this: 'What's a simple thing that makes you happy?, What's a hobby you've recently started?||If you could have dinner with any historical figure, who whould it be?. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational envirenment.  ";

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
