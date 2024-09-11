import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
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
  revalidatePath("/dashboard/event-types", "layout");
  console.log("from POST /api/event-types", data);
  return Response.json(newEevent);
}

export async function PUT(req: NextRequest) {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const data = await req.json();
  const email = await session().get("email");
  console.log("email: ", email);

  const id = data.id;
  if (!email || !id) {
    return { status: 401, json: { message: "Unauthorized" } };
  }
  const updatedEevent = await EventTypeModel.updateOne(
    { email, _id: id },
    data
  );
  revalidatePath("/dashboard/event-types", "layout");

  console.log("from PUT (edit) /api/event-types", data);
  return Response.json(updatedEevent);
}

// export async function DELETE(req: NextRequest) {
//   const url = new URL(req.url);
//   const id = url.searchParams.get("id");

//   await mongoose.connect(process.env.MONGODB_URI as string);
//   EventTypeModel.deleteOne({ _id: id });

//   revalidatePath("/dashboard/event-types", "layout");
//   return Response.json(true);
// }

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await mongoose.connect(process.env.MONGODB_URI as string);

  const result = await EventTypeModel.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    return Response.json({
      success: false,
      message: "Event not found or already deleted",
    });
  }

  console.log("Event deleted successfully:", result);

  revalidatePath("/dashboard/event-types", "layout");
  return Response.json({ success: true });
}
