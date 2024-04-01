// // import { saveAnswer } from "./../../../lib/message";
// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";

// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";
// // import { saveMessageData } from "../../../mongodb/messageService";
// import { saveQuestion, saveAnswer } from "@/lib/message";
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages } = body;

//     console.log(messages, "messages");
//     console.log("body", body);
//     console.log("userId from route", userId);
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!configuration.apiKey) {
//       return new NextResponse("OpenAI API Key not configured.", {
//         status: 500,
//       });
//     }

//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }

//     const freeTrial = await checkApiLimit();
//     const isPro = await checkSubscription();

//     if (!freeTrial && !isPro) {
//       return new NextResponse(
//         "Free trial has expired. Please upgrade to pro.",
//         { status: 403 }
//       );
//     }
//     await saveQuestion(messages[messages.length - 1].content, userId);
//     console.log("qqqq", messages[messages.length - 1].content);
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages,
//     });
//     const responseData = response.data.choices[0].message;
//     console.log("messages", messages);
//     if (!isPro) {
//       await incrementApiLimit();
//       if (messages.length > 1) {
//         // await saveQuestion(messages[messages.length - 1].content, userId);
//         console.log("aaa", messages[messages.length - 2].content);
//         await saveAnswer(messages[messages.length - 2].content, userId);
//       }
//     }

//     return NextResponse.json(responseData);
//   } catch (error) {
//     console.log("[CONVERSATION_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { saveQuestionDB, saveAnswerDB } from "@/lib/message";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages, chatId, textOutput, graphOutput } = body;
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
    console.log("messages 1 ", messages);
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }
    const userMessageContent = messages[messages.length - 1].content;
    const messageWithOutputs = `${userMessageContent} ${textOutput} ${graphOutput}`;
    // Save the question before making the OpenAI API call
    if (messages.length === 0) {
      await saveQuestionDB(body.content, chatId);
    }
    await saveQuestionDB(messages[messages.length - 1].content, chatId);
    console.log("messages 2", messages);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: messageWithOutputs },
        ...body.messages,
      ],
    });
    const responseData = response.data.choices[0].message;

    // Save the answer after receiving the response from OpenAI
    if (!isPro) {
      await incrementApiLimit();
      if (messages.length > 1) {
        await saveAnswerDB(messages[messages.length - 2].content, chatId);
      }
    }

    console.log("messages 3", messages);
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
