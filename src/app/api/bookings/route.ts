import { nylas } from "@/libs/nylas";
import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profile";
import { addMinutes } from "date-fns";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
// import { WhenType } from "nylas";

// type JsonData = {
//   guestName: string;
//   guestEmail: string;
//   guestNotes: string;
//   username: string;
//   bookingUri: string;
//   bookingTime: string;
// };

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

  booking.save();

  //   create this event calender

  const grantId = profileDoc.grantId;

  const startDate = new Date(bookingTime);
  await nylas.events.create({
    identifier: grantId,
    requestBody: {
      title: eventDoc.title,
      description: eventDoc.description,
      when: {
        startTime: Math.round(startDate.getTime() / 1000),
        endTime: Math.round(
          addMinutes(startDate, eventDoc.length).getTime() / 1000
        ),
      },
      conferencing: {
        autocreate: {},
        provider: "Google Meet",
      },
      participants: [
        {
          name: guestName,
          email: guestEmail,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: eventDoc.email,
    },
  });

  return Response.json(true, { status: 201 });
}
