import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
import { FaRegClock } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

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

  console.log("propss", props);

  if (!eventDoc) {
    return "404";
  }

  return (
    <div>
      <h1>Booking Page</h1>
      {/* {JSON.stringify(props)}
      {JSON.stringify(eventDoc)} */}

      <div className="flex items-center h-screen">
        <div className="w-full">
          <div className="mx-auto max-w-lg  shadow-lg rounded-xl flex">
            <div className="p-4 w-64 text-sm bg-slate-300">
              <h1 className="text-lg font-bold mb-4 border-b border-gray-600">
                {eventDoc?.title}
              </h1>
              <div className="grid gap-y-2 grid-cols-[40px_1fr]">
                <div>
                  <FaRegClock />
                </div>
                <div>{eventDoc?.length} minutes</div>

                <div>
                  <FiInfo />
                </div>
                <div>{eventDoc?.description}</div>
              </div>
            </div>
            <div className="bg-white grow p-8">right</div>
          </div>
        </div>
      </div>
    </div>
  );
}
