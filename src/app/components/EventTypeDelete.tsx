"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventTypeDelete({ id }: { id: string }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  //   async function handleDelete() {
  //     await axios.delete("/api/event-types?id=" + id);
  //     router.push("/dashboard/event-types");
  //     router.refresh();
  //   }

  async function handleDelete() {
    try {
      const response = await axios.delete("/api/event-types?id=" + id);

      if (response.data.success) {
        console.log("Event deleted successfully.");
        router.push("/dashboard/event-types");
        router.refresh();
      } else {
        console.error("Event deletion failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  }

  return (
    <div>
      {!showConfirmation && (
        <button
          onClick={() => setShowConfirmation(true)}
          type="button"
          className="bg-red-700 text-white !px-8 py-2 rounded-full m-5 text-xl"
        >
          Delete
        </button>
      )}
      {showConfirmation && (
        <div>
          <button
            onClick={() => setShowConfirmation(false)}
            className="bg-gray-700 text-white !px-8 py-2 rounded-full m-5 text-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className="bg-red-700 text-white !px-8 py-2 rounded-full m-5 text-xl"
          >
            Yes, Delete
          </button>
        </div>
      )}
    </div>
  );
}
