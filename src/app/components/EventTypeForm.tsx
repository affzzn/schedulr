"use client";
import TimeSelect from "@/app/components/TimeSelect";
import { BookingTimes, WeekdayName } from "@/libs/types";
import clsx from "clsx";
import { useState } from "react";

const weekdayNames: WeekdayName[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function EventTypeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState(30);
  const [bookingTimes, setBookingTimes] = useState<BookingTimes>(null as any);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ title, description, length, bookingTimes });
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
  //   const handleBookingTimeChange = (
  //     day: WeekdayName,
  //     val: string | boolean,
  //     props: "from" | "to" | "active"
  //   ) => {
  //     setBookingTimes((oldBookingTimes) => {
  //       const newBookingTimes: BookingTimes = { ...oldBookingTimes };
  //       if (!newBookingTimes[day]) {
  //         newBookingTimes[day] = { from: "00:00", to: "00:00" };
  //       }
  //       newBookingTimes[day][props] = val;
  //       return newBookingTimes;
  //     });
  //   };
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
      </div>
    </form>
  );
}
