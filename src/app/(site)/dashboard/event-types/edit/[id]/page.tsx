import EventTypeForm from "@/app/components/EventTypeForm";
import { EventTypeModel } from "@/models/EventTypes";
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

  return (
    <div>
      Edit Event:
      <EventTypeForm
        doc={JSON.parse(JSON.stringify(eventTypeDoc))}
        key={randomInt(10000000)}
      />
    </div>
  );
}
