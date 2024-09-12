import { nylas, nylasConfig } from "@/libs/nylas";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
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

  await session().set("email", email);

  await mongoose.connect(process.env.MONGODB_URI as string);

  const profileDoc = await ProfileModel.findOne({ email });

  if (profileDoc) {
    profileDoc.grantId = grantId;
    await profileDoc.save();
  } else {
    await ProfileModel.create({ email, grantId });
  }

  redirect("/");
}
