"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import AIGeneratedMessages from "@/components/AIGeneratedMessages";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

const FeedbackPage = () => {
  const { toast } = useToast();
  const { username } = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post(`/api/u/${username}`, {
        message: data.content,
        username,
      });

      // reset feild
      form.setValue("content", "");

      console.log(data.content);

      toast({
        title: "Success",
        description: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message || "An unexpected error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // If the username is not yet loaded, show a loader or placeholder
  if (!username || username.trim() === "") {
    return <div>Invalid or missing username. Please try again.</div>;
  }

  return (
    <div className="flex items-center gap-6 md:gap-8 flex-col min-h-screen mx-8 md:mx-2">
      <h2 className="md:text-4xl text-2xl whitespace-nowrap  font-bold lg:text-5xl md:mt-10 mt-4 p-8 md:p-12 ">
        Public Profile Link
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-3xl w-full flex flex-col justify-center"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-sm md:text-base">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="placeholder:text-sm md:text-base"
                    placeholder="Write your anonymous message here"
                    id="message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="md:mt-8 mt-5  p-5 w-auto self-center  "
            type="submit"
          >
            Send it
          </Button>
        </form>
      </Form>
      <div className="flex max-w-3xl w-full flex-col gap-4 justify-start items-start">
        <AIGeneratedMessages setMessage={form.setValue} />
        <div className="flex w-full flex-col gap-4 justify-center items-center mb-5 md:mb-8  md:text-base text-sm ">
          <Separator />
          <p>Get Your Message Board</p>
          <Link href="/sign-up">
            <Button>Create Your Account 🚀</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
