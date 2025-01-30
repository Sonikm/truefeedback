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
import { useEffect, useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import AIGeneratedMessages from "@/components/AIGeneratedMessages";

const formSchema = z.object({
  feedback: z
    .string()
    .min(2, {
      message: "Feedback must be at least 2 characters.",
    })
    .max(200, {
      message: "Feedback must be less than 200 characters.",
    }),
});

const FeedbackPage = ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  // State to store the username
  const [username, setUsername] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  // Fetch the username asynchronously
  useEffect(() => {
    const fetchUsername = async () => {
      const result = await params;
      setUsername(result.username);
    };
    fetchUsername();
  }, [params]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
    },
  });

  // If the username is not yet loaded, show a loader or placeholder
  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-8 flex-col min-h-screen mx-8 md:mx-2">
      <h2 className="text-4xl font-bold lg:text-5xl mt-10 p-12">
        Public Profile Link
      </h2>

      <Form {...form}>
        <form className="max-w-3xl w-full flex flex-col justify-center">
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write your anonymous message here"
                    id="message-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={disableBtn}
            className="mt-8 p-5 w-auto self-center"
            type="submit"
          >
            Send it
          </Button>
        </form>
      </Form>
      <div className="flex max-w-3xl w-full flex-col gap-4 justify-start items-start">
        <Button className="my-3">Suggest Messages</Button>
        <p>Click on any message below to select it.</p>
        <AIGeneratedMessages />
        <div className="flex w-full flex-col gap-4 justify-center items-center mb-8 ">
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
