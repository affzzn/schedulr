// import DashboardNav from "@/app/components/DashboardNav";
import ProfileForm from "@/app/components/ProfileForm";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";

export default async function DashboardPage() {
  // Connect to the database (server-side only)
  await mongoose.connect(process.env.MONGODB_URI as string);

  // Fetch session data (server-side only)
  const email = await session().get("email");

  if (!email) {
    // If the session doesn't have an email, redirect to the login page
    return <div>Redirecting...</div>; // Or handle a server-side redirect here
  }

  // Fetch the user's profile document
  const profileDoc = await ProfileModel.findOne({ email });

  return (
    <>
      {/* <DashboardNav username={profileDoc?.username || ""} /> */}
      <div>Dashboard Page</div>
      <ProfileForm existingUsername={profileDoc?.username || ""} />
    </>
  );
}
