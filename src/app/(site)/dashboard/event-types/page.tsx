"use server";
import { session } from "@/libs/session";
import mongoose from "mongoose";
import { EventTypeModel } from "../../../../models/EventTypes";
import Link from "next/link";
import { ProfileModel } from "@/models/Profile";

export default async function EventTypesPage() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const email = await session().get("email");

  const eventTypes = await EventTypeModel.find({ email });
  const profile = await ProfileModel.findOne({ email });

  return (
    <>
      <div className="mt-7 mb-4 flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">
          {/* Example Section */}
          <div className="border border-gray-300 p-4 mb-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Quick Meeting
              </span>
              <span className="text-gray-500">
                {process.env.NEXT_PUBLIC_URL}/username/quick-meeting
              </span>
            </div>
          </div>

          {/* Table of Event Types */}
          <div className="overflow-hidden">
            <table className="min-w-full table-auto">
              <tbody>
                {eventTypes.map((evt) => (
                  <tr
                    key={evt.id}
                    className="border-b border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-2 flex justify-between items-center">
                      <Link
                        href={`/dashboard/event-types/edit/${evt.id}`}
                        className="text-gray-900 hover:font-semibold"
                      >
                        {evt.title}
                      </Link>
                      <span className="text-gray-500">
                        {process.env.NEXT_PUBLIC_URL}/{profile?.username}/
                        {evt.uri}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
// import { ProfileModel } from "@/models/Profile";

// export default async function EventTypesPage() {
//   await mongoose.connect(process.env.MONGODB_URI as string);
//   const email = await session().get("email");
//   // if (!email) {
//   //   return { redirect: "/login" };
//   // }

//   const eventTypes = await EventTypeModel.find({ email });

//   const profile = await ProfileModel.findOne({ email });

//   return (
//     <>
//       {/* <DashboardNav /> */}

//       <div className="mt-7 mb-4 flex justify-center">
//         <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
//           <table className="min-w-full table-auto">
//             <tbody>
//               {eventTypes.map((evt) => (
//                 <tr
//                   key={evt.id}
//                   className="border-b border-gray-300 hover:bg-gray-100 transition-colors"
//                 >
//                   <td className="px-4 py-2">
//                     <Link
//                       href={`/dashboard/event-types/edit/${evt.id}`}
//                       className="text-gray-900 hover:font-semibold"
//                     >
//                       {evt.title}
//                     </Link>
//                     <div className="text-gray-500">
//                       <span>
//                         {process.env.NEXT_PUBLIC_URL}/{profile?.username}/
//                         {evt.uri}
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="flex justify-center mt-4">
//         <Link
//           href="/dashboard/event-types/new"
//           className="rounded-full border px-3 py-2 bg-white text-black m-3 hover:bg-gray-50"
//         >
//           + Create New Event
//         </Link>
//       </div>
//     </>
//   );
// }
