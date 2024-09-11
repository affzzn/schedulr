"use client";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// { username }: { username?: string }

export default function DashboardNav() {
  const pathname = usePathname();
  const isEventTypesPage = pathname.includes("event-types");
  const isBookedEventsPage = pathname.includes("booked-events");
  return (
    <div className="flex gap-4 justify-center">
      {/* <Link
        className={clsx(
          "rounded-full px-4 py-2",
          pathname === "/dashboard" ? "bg-blue-900 text-white" : "bg-gray-300"
        )}
        href={"/dashboard"}
      >
        Dashboard
      </Link> */}

      <>
        <Link
          className={clsx(
            "rounded-full px-4 py-2",
            isBookedEventsPage ? "bg-blue-900 text-white" : "bg-gray-300"
          )}
          href={"/dashboard/booked-events"}
        >
          Booked events
        </Link>

        <Link
          className={clsx(
            "rounded-full px-4 py-2",
            pathname === "/dashboard" ? "bg-blue-900 text-white" : "bg-gray-300"
          )}
          href={"/dashboard"}
        >
          Profile
        </Link>

        <Link
          className={clsx(
            "rounded-full px-4 py-2",
            isEventTypesPage ? "bg-blue-900 text-white" : "bg-gray-300"
          )}
          href={"/dashboard/event-types"}
        >
          Event types
        </Link>
      </>
    </div>
  );
}
