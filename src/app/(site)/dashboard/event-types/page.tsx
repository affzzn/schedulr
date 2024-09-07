"use server";
import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/libs/session";
import mongoose from "mongoose";
import { EventTypeModel } from "../../../../models/EventTypes";

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
      create new event type
      <form>
        <input type="text" placeholder="title" />
        <input type="text" placeholder="description" />
        <input type="number" placeholder="length" />
        <input type="text" placeholder="monday from" />
        <input type="text" placeholder="monday to" />
      </form>
    </>
  );
}
