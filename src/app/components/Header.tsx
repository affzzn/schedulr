"use server";

import { session } from "@/libs/session";
import Link from "next/link";

export default async function Header() {
  const email = await session().get("email");

  return (
    <header className="flex gap-4 justify-between py-4 text-2xl text-gray-600">
      <div className="flex gap-8 items-center">
        <Link href={"/"} className="text-blue-900 font-bold font-mono text-4xl">
          Schedulr
        </Link>
        <nav className="flex gap-7">
          <Link href={"/features"}>Features</Link>

          <Link href={"/about"}>About</Link>

          <Link href={"/pricing"}>Pricing</Link>
        </nav>
      </div>

      {email ? (
        <nav className="flex gap-7">
          <Link href={"/dashboard"} className="rounded-lg border px-2">
            Dashboard
          </Link>
          <Link href={"/api/logout"}>Logout</Link>
        </nav>
      ) : (
        <nav className="flex gap-7">
          <Link href={"/api/auth"}>Login</Link>
          <Link href={"/signup"} className="rounded-lg border px-2">
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}
