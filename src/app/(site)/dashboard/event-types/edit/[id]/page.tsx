import EventTypeForm from "@/app/components/EventTypeForm";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";

type pageProps = {
  params: {
    id: string;
  };
};

export default async function EditEventType({ params }: pageProps) {
  const id = params.id;

  await mongoose.connect(process.env.MONGODB_URI as string);

  const eventTypeDoc = await EventTypeModel.findById(id);
  const email = await session().get("email");
  const profileDoc = await ProfileModel.findOne({ email });

  if (!eventTypeDoc) {
    return "404"; // Return 404 or an appropriate response when the event is not found
  }

  // Handle the case where profileDoc is null (no profile found for the email)
  const username = profileDoc ? profileDoc.username : "";

  return (
    <div>
      Edit Event:
      <EventTypeForm
        username={username} // Use the safe username value
        doc={JSON.parse(JSON.stringify(eventTypeDoc))}
      />
    </div>
  );
}
