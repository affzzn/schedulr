import DashboardNav from "@/app/components/DashboardNav";

export default function DashboardPage() {
  return (
    <>
      <DashboardNav />
      <div>Dashboard Page</div>

      <form className="max-w-xs mx-auto mt-8">
        <label>
          <span>Username</span>
          <input type="text" />
          <button
            type="submit"
            className="bg-gray-700 text-white !px-8 py-2 rounded-full m-5 text-xl"
          >
            save
          </button>
        </label>
      </form>
    </>
  );
}
