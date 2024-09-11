import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

type JsonData = {
  guestName: string;
  guestEmail: string;
  guestNotes: string;
  username: string;
  bookingUri: string;
  bookingTime: string;
};

export async function POST(req: NextRequest) {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const data = await req.json();
  const { guestName, guestEmail, guestNotes, bookingTime } = data;

  const profileDoc = await ProfileModel.findOne({
    username: data.username,
  });

  const eventDoc = await EventTypeModel.findOne({
    email: profileDoc.email,
    uri: data.bookingUri,
  });

  if (!eventDoc) {
    return Response.json("Event not found", { status: 404 });
  }
  const booking = await BookingModel.create({
    guestName,
    guestEmail,
    guestNotes,
    when: bookingTime,
    eventTypeId: eventDoc._id,
  });

  //   create this event calender

  return Response.json(true, { status: 201 });
}
