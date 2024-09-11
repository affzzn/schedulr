import EventTypeForm from "@/app/components/EventTypeForm";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profile";
import { randomInt } from "crypto";
import mongoose from "mongoose";

type pageProps = {
  params: {
    id: string;
  };
};

export default async function EditEventType({ params }: pageProps) {
  //   console.log(params);

  const id = params.id;

  await mongoose.connect(process.env.MONGODB_URI as string);

  const eventTypeDoc = await EventTypeModel.findById(id);

  const email = await session().get("email");

  const profileDoc = await ProfileModel.findOne({ email });

  if (!eventTypeDoc) {
    return "404";
  }

  return (
    <div>
      Edit Event:
      <EventTypeForm
        username={profileDoc.username || ""}
        doc={JSON.parse(JSON.stringify(eventTypeDoc))}
        key={randomInt(10000000)}
      />
    </div>
  );
}
