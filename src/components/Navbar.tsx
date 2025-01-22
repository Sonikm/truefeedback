"use client";
import { Button } from "@react-email/components";
import { Link } from "lucide-react";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user: User = session?.user as User;

  if (status === "authenticated") {
    return <p>Signed in as {user.email}</p>;
  }

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        <h2 className="text-xl font-bold mb-4 md:mb-0">Mystry Message</h2>
        <Link href="">
          {session ? (
            <>
              <span className="mr-4 ">
                Welcome, {user.username || user.email}
              </span>
              <Button className="w-full md:w-auto" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button className="w-full md:w-auto">Login</Button>
              </Link>
            </>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
