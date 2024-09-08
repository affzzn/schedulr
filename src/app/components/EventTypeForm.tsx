"use client";
import TimeSelect from "@/app/components/TimeSelect";

const weekdayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export default function EventTypeForm() {
  return (
    <form className="gap-5 p-2 rounded-lg bg-slate-300">
      create new event type:
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label>
            <span>Title</span>
            <input type="text" placeholder="title" />
          </label>
          <label>
            <span>Description</span>
            <textarea placeholder="description" />
          </label>
          <label>
            <span>Duration (minutes)</span>
            <input type="number" placeholder="30" />
          </label>
        </div>
        <div>
          <div>
            <label>
              <span>Availability</span>
            </label>
            <div className="grid grid-cols-2 gap-1 items-center">
              {weekdayNames.map((d) => (
                <>
                  {d}

                  <div className="flex gap-3 items-center">
                    from:
                    <TimeSelect step={30} />
                    <span className="font-bold text-2xl">–</span>
                    <TimeSelect step={30} />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-900 text-white !px-8 py-2 rounded-full m-5 text-xl">
          Save
        </button>
      </div>
    </form>
  );
}
