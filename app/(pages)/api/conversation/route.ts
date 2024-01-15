import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import * as OpenAI from "openai";
// const { Configuration, OpenAIApi } = OpenAI;

import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "@clerk/nextjs";
// import { checkSubscription } from "@/lib/subscription";
// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const api = new OpenAIApi(configuration);
// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const api = new OpenAIApi(configuration);
// openai.d.ts
declare module "openai" {
  export class Configuration {
    constructor(opts: { apiKey: string });
    // Define other properties and methods...
  }

  export class OpenAIApi {
    constructor(configuration: Configuration);
    // Define other properties and methods...
  }

  // Define other classes and functions...
}
export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const body = await req.json();
    const { messages } = body;

    console.log("Received messages:", messages);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!configuration.apiKey) {
      console.error("OpenAI API key not configured.");
      return res.status(500).json({ error: "OpenAI API Key not configured." });
    }

    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if (!freeTrial && !isPro) {
    //   return new NextResponse(
    //     "Free trial has expired. Please upgrade to pro.",
    //     { status: 403 }
    //   );
    // }

    const response = await api.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    return res.status(200).json(response.data.choices[0].message);
    console.log("OpenAI API Key:", configuration.apiKey);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return res.status(500).json({
      error: error.message || "An unknown error occurred",
      details: error.details || null, // Add more error details if available
    });
  }
});
