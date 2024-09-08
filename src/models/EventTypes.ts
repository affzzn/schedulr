import mongoose from "mongoose";

const FromToSchema = new mongoose.Schema({
  from: String,
  to: String,
});

type FromTo = {
  from: string;
  to: string;
};

const BookingSchema = new mongoose.Schema({
  monday: FromToSchema,
  tuesday: FromToSchema,
  wednesday: FromToSchema,
  thursday: FromToSchema,
  friday: FromToSchema,
  saturday: FromToSchema,
  sunday: FromToSchema,
});

const EventTypeSchema = new mongoose.Schema<EventType>(
  {
    name: String,
    email: String,
    title: String,
    description: String,
    length: Number,
    bookingTimes: BookingSchema,
  },
  { timestamps: true }
);

export type WeekdayName =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type EventType = {
  name: string;
  email: string;
  title: string;
  description: string;
  length: number;
  bookingTimes: Record<WeekdayName, FromTo>;
};

export const EventTypeModel =
  mongoose.models?.EventType ||
  mongoose.model<EventType>("EventType", EventTypeSchema);
