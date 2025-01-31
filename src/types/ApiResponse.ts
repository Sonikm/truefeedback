import { Message } from "@/model/userModel";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean; // optional
  messages?: {
    messages: Message[];
  }[];
}
