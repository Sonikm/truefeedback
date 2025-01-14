import { Message } from "@/model/userModel";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAccesptingMessages?: boolean; // optional
  messages?: Array<Message>;
}
