import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    //checking if the user reaches the api usage limit
    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("Free Trial has expired", { status: 403 });
    }
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    //if the user is still in the free api counts
    await incrementApiLimit();

    // return NextResponse.json(response.data.choices[0].message);
    return NextResponse.json(response.data.choices[0].message);
  } catch (error: any) {
    console.error("[error]", error);
    if (error.response && error.response.status === 429) {
      return new NextResponse(
        "Rate limit exceeded. Retrying after a delay...",
        {
          status: 429,
        }
      );
    } else {
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
}
