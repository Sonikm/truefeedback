"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p> <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <p>Not signed in</p>
      <br />
      <button
        className="bg-orange-500 p-2 rounded m-4"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
