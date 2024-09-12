"use client";

import { useState } from "react";
import { format } from "date-fns";
import axios from "axios";

type PageProps = {
  params: {
    username: string;
    "booking-uri": string;
    "booking-time": string;
  };
};

export default function BookingFormPage(props: PageProps) {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestNotes, setGuestNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const username = props.params.username;
  const bookingUri = props.params["booking-uri"];
  const bookingTime = new Date(
    decodeURIComponent(props.params["booking-time"])
  );

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post("/api/bookings", {
      guestName,
      guestEmail,
      guestNotes,
      username,
      bookingUri,
      bookingTime,
    });
    console.log(response.data);
    setConfirmed(true);
  };

  return (
    // <div>
    //   Booking Form ---
    //   {JSON.stringify({ username, bookingUri, bookingTime })}
    // </div>

    <div className="text-left p-8 w-[400px]">
      <h2 className="text-2xl text-gray-500 font-bold mb-4 pb-2 border-b border-black/10">
        {format(bookingTime, "EEEE, MMMM d, HH:mm")}
      </h2>
      {confirmed && <div>Thanks for you booking!</div>}
      {!confirmed && (
        <form onSubmit={handleFormSubmit}>
          <label>
            <span>Your name</span>
            <input
              value={guestName}
              onChange={(ev) => setGuestName(ev.target.value)}
              type="text"
              placeholder="John Doe"
            />
          </label>
          <label>
            <span>Your email</span>
            <input
              value={guestEmail}
              onChange={(ev) => setGuestEmail(ev.target.value)}
              type="email"
              placeholder="test@example.com"
            />
          </label>
          <label>
            <span>Any additional info?</span>
            <textarea
              value={guestNotes}
              onChange={(ev) => setGuestNotes(ev.target.value)}
              placeholder="Any relevant information (optional)"
            />
          </label>
          <div className="text-center">
            <button
              type="submit"
              className="rounded-full px-4 py-2 bg-blue-900 text-white"
            >
              Confirm
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
