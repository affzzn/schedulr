"use client";

import { BookingTimes, WeekdayName } from "@/libs/types";
import { weekdayNames, weekdayNamesShort } from "@/libs/shared";
import { TimeSlot } from "nylas";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  addDays,
  addMinutes,
  addMonths,
  endOfDay,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isFuture,
  isLastDayOfMonth,
  isToday,
  startOfDay,
  subMonths,
} from "date-fns";
import clsx from "clsx";
import axios from "axios";

export default function TimePicker({
  bookingTimes,
  length,
  meetingUri,
  username,
}: {
  bookingTimes: BookingTimes;
  length: number;
  meetingUri: string;
  username: string;
}) {
  const currentDate = new Date();
  const [activeMonthDate, setActiveMonthDate] = useState(currentDate);
  const [activeMonthIndex, setActiveMonthIndex] = useState(
    activeMonthDate.getMonth()
  );
  const [activeYear, setActiveYear] = useState(activeMonthDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState<null | Date>(null);
  const [busySlots, setBusySlots] = useState<TimeSlot[]>([]);
  const [busySlotsLoaded, setBusySlotsLoaded] = useState(false); //

  //

  useEffect(() => {
    const checkBusySlots = async () => {
      if (selectedDay) {
        setBusySlots([]); // Clear busySlots when a new day is selected
        setBusySlotsLoaded(false); // Start loading state
        const params = new URLSearchParams();
        params.set("username", username);
        params.set("from", startOfDay(selectedDay).toISOString());
        params.set("to", endOfDay(selectedDay).toISOString());

        try {
          const response = await axios.get(`/api/busy?${params.toString()}`);
          setBusySlotsLoaded(true);

          // Ensure response.data is an array
          setBusySlots(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error("Failed to fetch busy slots:", error);
          setBusySlotsLoaded(true);
          setBusySlots([]); // In case of an error, set to empty array
        }
      }
    };

    checkBusySlots();
  }, [selectedDay]);

  function withinBusySlots(time: Date) {
    const bookingFrom = time;
    const bookingTo = addMinutes(new Date(time), length);

    for (let busySlot of busySlots) {
      const busyFrom = new Date(parseInt(busySlot.startTime) * 1000);
      const busyTo = new Date(parseInt(busySlot.endTime) * 1000);
      if (isAfter(bookingTo, busyFrom) && isBefore(bookingTo, busyTo)) {
        return true;
      }
      if (isAfter(bookingFrom, busyFrom) && isBefore(bookingFrom, busyTo)) {
        return true;
      }
      if (isEqual(bookingFrom, busyFrom)) {
        return true;
      }
      if (isEqual(bookingTo, busyTo)) {
        return true;
      }
    }

    return false;
  }

  const firstDayOfCurrentMonth = new Date(activeYear, activeMonthIndex, 1);
  const firstDayOfCurrentMonthWeekdayIndex = getDay(firstDayOfCurrentMonth);
  const emptyDaysCount =
    firstDayOfCurrentMonthWeekdayIndex === 0
      ? 6
      : firstDayOfCurrentMonthWeekdayIndex - 1;
  const emptyDaysArr = new Array(emptyDaysCount).fill("", 0, emptyDaysCount);
  const daysNumbers = [firstDayOfCurrentMonth];
  do {
    const lastAddedDay = daysNumbers[daysNumbers.length - 1];
    daysNumbers.push(addDays(lastAddedDay, 1));
  } while (!isLastDayOfMonth(daysNumbers[daysNumbers.length - 1]));

  let selectedDayConfig = null;
  const bookingHours = [];
  if (selectedDay) {
    const weekdayNameIndex = format(
      selectedDay,
      "EEEE"
    ).toLowerCase() as WeekdayName;
    selectedDayConfig = bookingTimes?.[weekdayNameIndex];
    if (selectedDayConfig) {
      const [hoursFrom, minutesFrom] = selectedDayConfig.from.split(":");
      const selectedDayFrom = new Date(selectedDay);
      selectedDayFrom.setHours(parseInt(hoursFrom));
      selectedDayFrom.setMinutes(parseInt(minutesFrom));
      const selectedDayTo = new Date(selectedDay);
      const [hoursTo, minutesTo] = selectedDayConfig.to.split(":");
      selectedDayTo.setHours(parseInt(hoursTo));
      selectedDayTo.setMinutes(parseInt(minutesTo));
      let a = selectedDayFrom;
      do {
        if (!withinBusySlots(a)) {
          bookingHours.push(a);
        }
        a = addMinutes(a, 30);
      } while (isBefore(addMinutes(a, length), selectedDayTo));
    }
  }

  function prevMonth() {
    setActiveMonthDate((prev) => {
      const newActiveMonthDate = subMonths(prev, 1);
      setActiveMonthIndex(newActiveMonthDate.getMonth());
      setActiveYear(newActiveMonthDate.getFullYear());
      return newActiveMonthDate;
    });
  }

  function nextMonth() {
    setActiveMonthDate((prev) => {
      const newActiveMonthDate = addMonths(prev, 1);
      setActiveMonthIndex(newActiveMonthDate.getMonth());
      setActiveYear(newActiveMonthDate.getFullYear());
      return newActiveMonthDate;
    });
  }

  function handleDayClick(day: Date) {
    setSelectedDay(day);
  }

  // return (
  //   <div>
  //     Calender here
  //     <ChevronLeft />
  //     <ChevronRight />
  //   </div>
  // );

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-4 w-full md:w-3/5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold">
            {format(new Date(activeYear, activeMonthIndex, 1), "MMMM")}{" "}
            {activeYear}
          </span>
          <div>
            <button
              onClick={prevMonth}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-x-10 text-center text-sm text-gray-500">
          {weekdayNamesShort.map((w) => (
            <div key={w} className="font-bold uppercase">
              {w}
            </div>
          ))}
          {emptyDaysArr.map((_, emptyIndex) => (
            <div key={emptyIndex} />
          ))}
          {daysNumbers.map((n) => {
            const weekdayNameIndex = format(
              n,
              "EEEE"
            ).toLowerCase() as WeekdayName;
            const weekdayConfig = bookingTimes?.[weekdayNameIndex];
            const isActiveInBookingTimes = weekdayConfig?.active;
            const canBeBooked = isFuture(n) && isActiveInBookingTimes;
            const isSelected = selectedDay && isEqual(n, selectedDay);
            return (
              <div key={n.toISOString()}>
                <button
                  disabled={!canBeBooked}
                  onClick={() => handleDayClick(n)}
                  className={clsx(
                    "w-8 h-8 rounded-full inline-flex items-center justify-center",
                    canBeBooked && !isSelected
                      ? "bg-blue-100 text-blue-700"
                      : "",
                    isToday(n) && !isSelected
                      ? "bg-gray-200 text-gray-500"
                      : "",
                    isSelected ? "bg-blue-500 text-white" : ""
                  )}
                >
                  {format(n, "d")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {selectedDay && (
        <div className="pt-4 md:pt-0 md:pl-12 w-full md:w-1/2">
          <p className="text-sm mb-2">{format(selectedDay, "EEEE, MMMM d")}</p>
          <div className="grid gap-2 max-h-52 overflow-auto">
            {!busySlotsLoaded && (
              <div className="flex justify-center py-4">
                {/* <PulseLoader color="#3B82F6" /> */}
              </div>
            )}
            {busySlotsLoaded &&
              bookingHours.map((bookingTime) => (
                <div key={bookingTime.toISOString()}>
                  <Link
                    href={`/${username}/${meetingUri}/${bookingTime.toISOString()}`}
                    className="block border-2 rounded-lg border-blue-900 text-blue-900 font-semibold p-2 hover:bg-blue-50"
                  >
                    {format(bookingTime, "HH:mm")}
                  </Link>
                </div>
              ))}
            <div className="mb-8">&nbsp;</div>
          </div>
        </div>
      )}
    </div>
  );
}
