"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [showLine, setShowLine] = useState(false);
  useEffect(() => {
    setShowLine(true);
  }, []);
  return (
    <section className="text-center mt-72">
      <h1 className="text-5xl font-bold mb-6 leading-tight">
        Scheduling{" "}
        <span
          className={
            "text-blue-900 cool-underline " + (showLine ? "show-underline" : "")
          }
        >
          made simple
        </span>
        <br />
        for people like you
      </h1>
      <p className="text-gray-600">
        Most scheduling apps are simple but ours is even more simple.
        <br />
        Apart from this, it&apos;s also open source.
      </p>
      <div className="mt-4 flex gap-4 justify-center">
        <Link href={"/"} className="bg-black text-white py-2 px-4 rounded-full">
          Get started for free
        </Link>
      </div>
    </section>
  );
}
