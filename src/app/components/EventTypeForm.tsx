"use client";
import TimeSelect from "@/app/components/TimeSelect";
import { BookingTimes, WeekdayName } from "@/libs/types";
import { IEventType } from "@/models/EventTypes";
import axios from "axios";
import clsx from "clsx";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EventTypeDelete from "./EventTypeDelete";

const weekdayNames: WeekdayName[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function EventTypeForm({ doc }: { doc?: IEventType }) {
  const [title, setTitle] = useState(doc?.title || "");
  const [description, setDescription] = useState(doc?.description || "");
  const [length, setLength] = useState(doc?.length || 30);
  const [bookingTimes, setBookingTimes] = useState<BookingTimes>(
    doc?.bookingTimes || {}
  );

  const router = useRouter();

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // console.log({ title, description, length, bookingTimes });

    try {
      // if (doc?._id) {
      // edit the event type
      //   axios.put(`/api/event-types/${doc._id}`, {});
      // }

      // const response = await axios.post("/api/event-types", {
      //   title,
      //   description,
      //   length,
      //   bookingTimes,
      // });

      const id = doc?._id;
      const request = id ? axios.put : axios.post;

      const data = { title, description, length, bookingTimes };
      const response = await request("/api/event-types", { ...data, id });

      console.log({ response });
      if (response.data) {
        router.push("/dashboard/event-types");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleBookingTimeChange(
    day: WeekdayName,
    val: string | boolean,
    prop: "from" | "to" | "active"
  ) {
    setBookingTimes((oldBookingTimes) => {
      const newBookingTimes: BookingTimes = { ...oldBookingTimes };
      if (!newBookingTimes[day]) {
        newBookingTimes[day] = { from: "00:00", to: "00:00", active: false };
      }

      // @ts-ignore
      newBookingTimes[day][prop] = val;

      return newBookingTimes;
    });
  }

  return (
    <form
      className="gap-5 p-2 rounded-lg bg-slate-300"
      onSubmit={handleFormSubmit}
    >
      create new event type:
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label>
            <span>Title</span>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <span>Duration (minutes)</span>
            <input
              type="number"
              placeholder="30"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <div>
            <label>
              <span>Availability</span>
            </label>
            <div className="grid gap-2">
              {weekdayNames.map((d) => {
                const from = bookingTimes?.[d]?.from || "00:00";
                const to = bookingTimes?.[d]?.to || "00:00";
                const active = bookingTimes?.[d]?.active || false;
                return (
                  <div className="grid grid-cols-2 gap-1 items-center">
                    <div>
                      <input
                        type="checkbox"
                        value={1}
                        checked={bookingTimes?.[d]?.active}
                        onChange={(e) =>
                          handleBookingTimeChange(d, e.target.checked, "active")
                        }
                        className="cursor-pointer p-0"
                      />
                      {d}
                    </div>

                    <div
                      className={clsx(
                        "flex gap-3 items-center",
                        "cursor-pointer",
                        active ? "" : "opacity-50"
                      )}
                    >
                      <TimeSelect
                        step={30}
                        value={bookingTimes?.[d]?.from || ""}
                        onChange={(val) =>
                          handleBookingTimeChange(d, val, "from")
                        }
                      />
                      <span className="font-bold text-2xl">–</span>
                      <TimeSelect
                        step={30}
                        value={bookingTimes?.[d]?.to || ""}
                        onChange={(val) =>
                          handleBookingTimeChange(d, val, "to")
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-900 text-white !px-8 py-2 rounded-full m-5 text-xl"
          type="submit"
        >
          Save
        </button>
        {doc && <EventTypeDelete id={doc._id as string} />}
      </div>
    </form>
  );
}
