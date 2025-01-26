import { Mail } from "lucide-react"; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/data/messages.json";

const MessageSlider = () => {
  return (
    <div className="flex items-center justify-center lg:justify-end">
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full max-w-lg"
      >
        <CarouselContent className="w-full">
          {messages.map((message, index) => (
            <CarouselItem key={index} className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>{message.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                  <Mail className="flex-shrink-0" />
                  <div>
                    <p>{message.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {message.received}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MessageSlider;
