// import { session } from "@/libs/session";
// import { revalidatePath } from "next/cache";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     await session().set("grantId", null);
//     await session().set("email", null);
//     await session().destroy();

//     // Revalidate the path to ensure client-side cache is updated
//     revalidatePath("/");

//     // Return a redirect response and a JSON response
//     const redirectUrl = "/?logged-out=1";
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error("Error during logout:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }

import { session } from "@/libs/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET() {
  await session().set("grantId", null);
  await session().set("email", null);
  await session().destroy();
  revalidatePath("/");
  redirect("/?logged-out=1");

  return Response.json("Logged out", { status: 200 });
}
