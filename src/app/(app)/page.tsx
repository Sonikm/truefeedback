"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, Shield, Zap, ArrowRight } from "lucide-react"; // Assuming you have an icon for messages
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import MessageSlider from "@/components/MessageSlider";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  return (
    <>
      <div className="relative overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-grid-gray-700/20 bg-[size:20px_20px]"
          style={{
            maskImage: "radial-gradient(gray, transparent)",
            WebkitMaskImage: "radial-gradient(gray, transparent)",
          }}
        ></div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
              <div>
                <h2 className="text-3xl font-bold text-gray-100 sm:text-4xl mb-2">
                  TrueFeedback
                </h2>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl xl:text-7xl">
                  Honest Feedback,{" "}
                  <span className="text-blue-400">Anonymously</span>
                </h1>
              </div>
              <p className="mx-auto max-w-2xl text-lg text-gray-300 lg:mx-0 xl:text-xl">
                TrueFeedback empowers users to provide genuine, constructive
                insights without revealing their identity. Create a space for
                unfiltered truth and drive positive change.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Signup
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full px-16 text-blue-500 sm:w-auto border-gray-600  hover:bg-gray-500"
                  >
                    Login
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { Icon: Shield, text: "100% Anonymous" },
                  { Icon: MessageCircle, text: "Honest Insights" },
                  { Icon: Zap, text: "Drive Change" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center space-x-2 rounded-lg bg-gray-800 p-3 border border-gray-700"
                  >
                    <feature.Icon className="h-6 w-6 text-blue-400" />
                    <span className="text-sm font-medium text-gray-200">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <MessageSlider />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
        <Footer />
      </div>
    </>
  );
}
