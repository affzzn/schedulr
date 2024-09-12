// import TimePicker from "@/app/components/TimePicker";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
import { FaRegClock } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    username: string;
    "booking-uri": string;
  };
};

export default async function BookingBoxLayout(props: LayoutProps) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-slate-300">
          <h1 className="text-xl font-bold mb-4 border-b border-gray-600">
            {eventDoc?.title}
          </h1>
          <div className="grid gap-y-2 grid-cols-[40px_1fr] text-sm">
            <div className="flex items-center justify-center text-gray-600">
              <FaRegClock />
            </div>
            <div>{eventDoc?.length} minutes</div>

            <div className="flex items-center justify-center text-gray-600">
              <FiInfo />
            </div>
            <div>{eventDoc?.description}</div>
          </div>
        </div>
        <div className="p-8">
          {/* <TimePicker
            username={props.params.username}
            meetingUri={eventDoc.uri}
            length={eventDoc.length}
            bookingTimes={JSON.parse(JSON.stringify(eventDoc.bookingTimes))}
          /> */}
          {props.children}
        </div>
      </div>
    </div>
  );
}
