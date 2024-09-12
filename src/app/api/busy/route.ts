import { nylas } from "@/libs/nylas";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { TimeSlot } from "nylas";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");
  // const bookingUri = url.searchParams.get("booking-uri");
  const from = new Date(url.searchParams.get("from") as string);
  const to = new Date(url.searchParams.get("to") as string);

  mongoose.connect(process.env.MONGODB_URI as string);

  const profileDoc = await ProfileModel.findOne({ username });

  if (!profileDoc) {
    return Response.json("Profile not found", { status: 404 });
  }

  const nylasBusyResult = await nylas.calendars.getFreeBusy({
    identifier: profileDoc.grantId,
    requestBody: {
      emails: [profileDoc.email],
      startTime: Math.round(from.getTime() / 1000),
      endTime: Math.round(to.getTime() / 1000),
    },
  });

  let busySlots: TimeSlot[] = [];
  if (nylasBusyResult.data?.[0]) {
    // @ts-expect-error: TimeSlot type may be mismatched from the API response.
    const slots = nylasBusyResult.data?.[0]?.timeSlots as TimeSlot[];
    // @ts-expect-error: Filter requires manual handling of undefined types in the slots array.
    busySlots = slots.filter((slot) => slot.status === "busy");
  }

  return Response.json(busySlots, { status: 200 });
}
