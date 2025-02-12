import nodemailer from "nodemailer";

export async function sendVerificationEmail(email, username, verifyCode) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS, // Use App Password here
      },
    });

    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Verification Code",
      text: `Hello ${username}, your verification code is: ${verifyCode}`,
    });

    return { success: true, message: "Verification email sent." };
  } catch (error) {
    console.log("Error sending email:", error.message);
    return { success: false, message: "Failed to send verification email." };
  }
}

/*
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "test@resend.dev",
      to: email,
      subject: "TrueFeedback Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return { success: true, message: "Verification email successfully.." };
  } catch (emailError) {
    console.log("Error sending verificatin email: ", emailError.message);
    return { success: false, message: "Failed to send verification email" };
  }
}


*/
