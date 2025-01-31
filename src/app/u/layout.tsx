// import { Button } from "@/components/ui/button";
// import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <nav className="p-4 -2 md:p-6 shadow-md bg-[#111827] w-full text-white flex justify-between items-center ">
        <h2 className="text-xl font-bold mx-4 my-1 ">True Feedback</h2>
        {/* <Link href="/sign-in">
            <Button className="w-full md:w-auto md:text-lg text-white">Login</Button>
          </Link> */}
      </nav>
      {children}
    </div>
  );
}
