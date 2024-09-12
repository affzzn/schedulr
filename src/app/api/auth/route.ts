// import { nylas, nylasConfig } from "@/libs/nylas";
// import { NextResponse } from "next/server";

// export async function GET() {
//   // Ensure clientId is defined
//   const clientId = nylasConfig.clientId;
//   const redirectUri = nylasConfig.callbackUri;

//   if (!clientId || !redirectUri) {
//     return new Response("Nylas client ID or callback URI is missing", {
//       status: 500,
//     });
//   }

//   const authUrl = nylas.auth.urlForOAuth2({
//     clientId: clientId as string,
//     redirectUri: redirectUri,
//   });

//   return NextResponse.redirect(authUrl);
// }

import { nylas, nylasConfig } from "@/libs/nylas";
import { redirect } from "next/navigation";

export async function GET() {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId as string,
    redirectUri: nylasConfig.callbackUri,
  });
  return redirect(authUrl);
}
