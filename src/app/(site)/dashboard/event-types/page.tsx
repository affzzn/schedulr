"use server";
import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/libs/session";
import mongoose from "mongoose";
import { EventTypeModel } from "../../../../models/EventTypes";
import Link from "next/link";

export default async function EventTypesPage() {
  mongoose.connect(process.env.MONGODB_URI as string);
  const email = await session().get("email");
  if (!email) {
    return { redirect: "/login" };
  }

  const eventTypes = await EventTypeModel.find({ email });
  console.log("eventTypes");
  console.log(eventTypes);
  return (
    <>
      <DashboardNav />
      Event Types:
      {JSON.stringify(eventTypes)}
      <br />
      <div className="flex justify-center mt-4">
        <Link
          href="/dashboard/event-types/new"
          className="rounded-lg border border-black px-2 py-1 bg-slate-300"
        >
          + New Event Type
        </Link>
      </div>
    </>
  );
}
