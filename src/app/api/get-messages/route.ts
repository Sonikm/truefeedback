import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/model/userModel";

export async function GET() {
  dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 500 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: { "messages.createdAt": -1 },
      },
      {
        $group: {
          _id: "$_id",
          messages: {
            $push: "$messages",
          },
        },
      },
    ]);

    // if (!user || user.length === 0) {
    //   return Response.json(
    //     { success: false, message: "No Message yet" },
    //     { status: 401 }
    //   );
    // }

    return Response.json(
      { success: true, messages: user },
      { status: 200 }
    );
  } catch (error) {
    console.log("An unexpeced error occured", error);
    return Response.json(
      {
        success: false,
        message: "An unexpeced error occured",
      },
      { status: 500 }
    );
  }
}
