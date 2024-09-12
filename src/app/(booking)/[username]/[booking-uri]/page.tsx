import TimePicker from "@/app/components/TimePicker";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
// import { FaRegClock } from "react-icons/fa";
// import { FiInfo } from "react-icons/fi";

type PageProps = {
  params: {
    username: string;
    "booking-uri": string;
  };
};

export default async function BookingPage(props: PageProps) {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const profileDoc = await ProfileModel.findOne({
    username: props.params?.username,
  });

  const eventDoc = await EventTypeModel.findOne({
    email: profileDoc?.email,
    uri: props.params?.["booking-uri"],
  });

  if (!eventDoc) {
    return "404";
  }

  return (
    <TimePicker
      username={props.params.username}
      meetingUri={eventDoc.uri}
      length={eventDoc.length}
      bookingTimes={JSON.parse(JSON.stringify(eventDoc.bookingTimes))}
    />
  );
}
