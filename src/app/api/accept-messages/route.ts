import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
//  User type or interface defines the shape of a user's data that is returned by NextAuth during authentication.
import { User } from "next-auth";
import UserModel from "@/model/userModel";

export async function POST(request: Request) {
  await dbConnect();

  // Retrive the session information of currently logged-in user on the server side.
  // getServerSession() retrieves the session data for the currently authenticated user in a server-side context.
  const session = await getServerSession(authOptions); // authOptions --> auth configuration
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 400 }
    );
  }

  const userId = user._id;

  const { acceptMessages } = await request.json();

  try {
    const upadtedUser = await UserModel.findByIdAndUpdate(userId, {
      isAcceptingMessages: acceptMessages,
    });

    if (!upadtedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User acceptance status updated successfully..",
        upadtedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update user status to accept messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user status to accept messages",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 400 }
    );
  }

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting message acceptance messages", error);
    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance messages",
      },
      { status: 500 }
    );
  }
}
