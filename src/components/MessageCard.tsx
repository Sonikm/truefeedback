import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import AlertDialogBox from "./AlertDialogBox";
import { Message } from "@/model/userModel";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { formattedDate } from "@/helper/formattedDate";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
  fetchMessages: () => void;
};

const MessageCard = ({
  message,
  onMessageDelete,
  fetchMessages,
}: MessageCardProps) => {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast({ title: response.data.message });
    onMessageDelete(message._id as string);
    fetchMessages();
  };

  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <CardContent className="flex p-2 md:p-6 justify-between flex-row items-center gap-4">
          <CardTitle className="md:text-xl">{message.content}</CardTitle>
          <AlertDialogBox handleDeleteConfirm={handleDeleteConfirm} />
        </CardContent>
        <CardFooter className="text-sm md:text-base">
          {formattedDate(message.createdAt)}
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default MessageCard;
