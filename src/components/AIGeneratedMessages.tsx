import axios from "axios";
import { Button } from "./ui/button";
import { useState } from "react";
import { defaultSuggestions } from "@/data/defaultSuggestions";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const AIGeneratedMessages = ({ setMessage }) => {
  const [suggestions, setSuggestions] = useState(defaultSuggestions);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/suggest-messages");
      const filteredSuggestions = response.data.filteredRes.split("||");
      setSuggestions(filteredSuggestions);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={fetchMessages} className="md:my-3 mt-3">
        Suggest Messages
      </Button>
      <p className="text-sm md:text-base">
        Click on any message below to select it.
      </p>
      <div className="border-2 rounded-lg w-full p-4 md:p-6 mb-4">
        <h3 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">Messages</h3>

        <ul className="flex flex-col gap-3 md:gap-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-6 w-full my-1" />
              ))
            : suggestions.map((message, index) => (
                <li
                  key={index}
                  onClick={() => setMessage("content", message)}
                  className="cursor-pointer border-2 text-xs md:text-sm rounded-lg p-2 hover:bg-gray-100 text-center font-semibold"
                >
                  {message}
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default AIGeneratedMessages;
