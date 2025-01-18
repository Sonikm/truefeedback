import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/userModel";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    // is user accepting messages
    if (!user.isAcceptiongMessage) {
      return Response.json(
        { success: false, message: "User not accepting the messages" },
        { status: 401 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as Message);

    return Response.json(
      { success: true, message: "Message is accepting successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error occure while sending message", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 401 }
    );
  }
}
