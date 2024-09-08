import { FromTo, WeekdayName } from "@/libs/types";
import mongoose, { Model } from "mongoose";

const FromToSchema = new mongoose.Schema({
  from: String,
  to: String,
  active: Boolean,
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

const EventTypeSchema = new mongoose.Schema<IEventType>(
  {
    email: String,
    title: String,
    description: String,
    length: Number,
    bookingTimes: BookingSchema,
  },
  { timestamps: true }
);

export type BookingTimes = Record<WeekdayName, FromTo>;

export interface IEventType extends mongoose.Document {
  email: string;
  uri: string;
  title: string;
  description: string;
  length: number;
  bookingTimes: BookingTimes;
  createdAt: Date;
  updatedAt: Date;
}

export const EventTypeModel =
  (mongoose.models?.EventType as Model<IEventType>) ||
  mongoose.model<IEventType>("EventType", EventTypeSchema);
