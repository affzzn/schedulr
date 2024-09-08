import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const data = await req.json();
  const email = await session().get("email");
  console.log("email: ", email);

  if (!email) {
    return { status: 401, json: { message: "Unauthorized" } };
  }
  const newEevent = await EventTypeModel.create({ ...data, email });
  console.log("from POST /api/event-types", data);
  return Response.json(newEevent);
}
