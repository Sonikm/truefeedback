"use client";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  // if (status === "authenticated") {
  //   return <p>Signed in as {user.email}</p>;
  // }

  return (
    <nav className="p-4 md:p-6 shadow-md bg-[#111827] text-white">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold mx-4">True Feedback</h2>
        <div className="flex justify-center items-center ">
          {session && user ? (
            <>
              <span className="mr-4 ">
                Welcome, {user.username || user.email}
              </span>
              <Button className="w-full md:w-auto" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="w-full md:w-auto md:text-lg">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
