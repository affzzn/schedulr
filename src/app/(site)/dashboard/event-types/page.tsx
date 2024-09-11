"use server";
import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/libs/session";
import mongoose from "mongoose";
import { EventTypeModel } from "../../../../models/EventTypes";
import Link from "next/link";

export default async function EventTypesPage() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const email = await session().get("email");
  if (!email) {
    return { redirect: "/login" };
  }

  const eventTypes = await EventTypeModel.find({ email });

  return (
    <>
      <DashboardNav />

      <div className="mt-7 mb-4 flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">Events</th>
              </tr>
            </thead>
            <tbody>
              {eventTypes.map((evt) => (
                <tr
                  key={evt.id}
                  className="border-b border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-4 font-medium">
                    <Link
                      href={"/dashboard/event-types/edit/" + evt.id}
                      className="text-gray-800"
                    >
                      {evt.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Link
          href="/dashboard/event-types/new"
          className="rounded-full border px-3 py-2 bg-white text-black m-3 hover:bg-gray-50"
        >
          + Create New Event
        </Link>
      </div>
    </>
  );
}

// "use server";
// import DashboardNav from "@/app/components/DashboardNav";
// import { session } from "@/libs/session";
// import mongoose from "mongoose";
// import { EventTypeModel } from "../../../../models/EventTypes";
// import Link from "next/link";

// export default async function EventTypesPage() {
//   mongoose.connect(process.env.MONGODB_URI as string);
//   const email = await session().get("email");
//   if (!email) {
//     return { redirect: "/login" };
//   }

//   const eventTypes = await EventTypeModel.find({ email });
//   console.log("eventTypes");
//   // console.log(eventTypes);

//   return (
//     <>
//       <DashboardNav />

//       {/* {JSON.stringify(eventTypes)} */}

//       <div className="mt-7 rounded-xl overflow-hidden mb-4 ml-2 mr-2 bg-slate-100">
//         {eventTypes.map((evt) => (
//           <div key={evt.id} className="block p-4 border-b border-gray-400">
//             <Link href={"/dashboard/event-types/edit/" + evt.id}>
//               {evt.title}
//             </Link>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mt-4">
//         <Link
//           href="/dashboard/event-types/new"
//           className="rounded-full border px-3 py-2 bg-white m-3 hover:bg-slate-100"
//         >
//           + Create New Event
//         </Link>
//       </div>
//     </>
//   );
// }
