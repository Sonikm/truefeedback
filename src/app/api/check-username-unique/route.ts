import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {

  await dbConnect();
  // url=>  localhost:3000/api/cuu?username=soni?phone=android
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    //validation with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    // TODO: check console
    console.log(result);

    if (!result.success) {
      // formate error using zod
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    return Response.json(
      { success: true, message: "Username is unique" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return Response.json(
      { message: "Error checking username", success: false },
      { status: 500 }
    );
  }
}
