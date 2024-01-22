import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

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

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("Free Trial has expired", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    //if the user is still in the free api counts
    await incrementApiLimit();

    // return NextResponse.json(response.data.choices[0].message);
    return NextResponse.json(response.data.choices[0].message);
  } catch (error: any) {
    console.error("[CODE_ERROR]", error);
    if (error.response && error.response.status === 429) {
      // Handle rate limit error by returning a response with status 429
      return new NextResponse(
        "Rate limit exceeded. Retrying after a delay...",
        {
          status: 429,
        }
      );
    } else {
      // Handle other errors
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
}