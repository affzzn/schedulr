import { nylas, nylasConfig } from "@/libs/nylas";
import { session } from "@/libs/session";
import { NextApiRequest } from "next";
import { redirect } from "next/navigation";

export async function GET(req: NextApiRequest) {
  console.log("Received callback from Nylas");
  const url = new URL(req.url as string);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("No authorization code returned from Nylas", {
      status: 400,
    });
  }

  // Ensure clientId and clientSecret (apiKey) are defined
  const clientId = nylasConfig.clientId;
  const clientSecret = nylasConfig.apiKey;

  if (!clientId || !clientSecret) {
    return Response.json("Nylas client ID or API key is missing", {
      status: 500,
    });
  }

  const codeExchangePayload = {
    clientSecret,
    clientId,
    redirectUri: nylasConfig.callbackUri,
    code,
  };

  const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
  const { grantId, email } = response;

  // NB: This stores in RAM
  // In a real app you would store this in a database, associated with a user
  //   process.env.NYLAS_GRANT_ID = grantId;

  await session().set("grantId", grantId);
  await session().set("email", email);

  redirect("/");
}
