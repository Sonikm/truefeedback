import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/userModel";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    // Ensure database connection is established
    await dbConnect();

    const { message } = await req.json();
    const { username } = params;

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User does not exist to send feedback" },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        { success: false, message: "User is not accepting messages" },
        { status: 403 }
      );
    }

    // Create the new message object
    const newMessage = {
      content: message,
      createdAt: new Date(),
    };

    // Push the new message to the user's messages array
    user.messages.push(newMessage as Message);

    // Save the updated user document
    await user.save();

    return NextResponse.json(
      { success: true, message: "Message sent successfully", user },
      { status: 200 }
    );
  } catch (error) {
    // Catch any potential errors in DB connection, message sending, etc.
    console.error("Error sending message:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, please try again later.",
      },
      { status: 500 }
    );
  }
}
