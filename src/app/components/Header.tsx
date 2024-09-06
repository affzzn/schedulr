"use server";

import { session } from "@/libs/session";
import Link from "next/link";
import RightNav from "./RightNav";

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

      <RightNav email={email} />
    </header>
  );
}
