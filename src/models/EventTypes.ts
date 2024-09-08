import { FromTo, WeekdayName } from "@/libs/types";
import mongoose from "mongoose";

const FromToSchema = new mongoose.Schema({
  from: String,
  to: String,
});

const BookingSchema = new mongoose.Schema<Record<WeekdayName, FromTo>>({
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

export type BookingTimes = Record<WeekdayName, FromTo>;

type EventType = {
  name: string;
  email: string;
  title: string;
  description: string;
  length: number;
  bookingTimes: BookingTimes;
};

export const EventTypeModel =
  mongoose.models?.EventType ||
  mongoose.model<EventType>("EventType", EventTypeSchema);
