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
  // console.log(eventTypes);

  return (
    <>
      <DashboardNav />

      {/* {JSON.stringify(eventTypes)} */}

      <div className="mt-4 border border-b-2 border-sky-950 rounded-xl overflow-hidden mb-4 ml-2 mr-2">
        {eventTypes.map((evt) => (
          <div key={evt.id} className="block p-2 border-b border-gray-400">
            <Link href={"/dashboard/event-types/edit/" + evt.id}>
              {evt.title}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link
          href="/dashboard/event-types/new"
          className="rounded-full border px-3 py-2 bg-white m-3 hover:bg-slate-100"
        >
          + Create New Event
        </Link>
      </div>
    </>
  );
}
