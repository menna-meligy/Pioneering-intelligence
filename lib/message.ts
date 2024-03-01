import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export const saveMessageData = async (question: string, answer: string) => {
  const maxLength = 100; // Assuming the maximum length allowed is 255 characters

  const truncatedQuestion =
    question.length > maxLength ? question.slice(0, maxLength) : question;
  const truncatedAnswer =
    answer.length > maxLength ? answer.slice(0, maxLength) : answer;

  const { userId } = auth();
  console.log("uuuuuuuuuuuuuuuuuuuuuuuu", userId);
  if (!userId) {
    console.log("uuuuuuuuuuuuuuuuuuuuuuuu", userId);
    return false;
  }

  console.log("Saving message data...");
  console.log("Question:", question);
  console.log("Answer:", answer);

  const existingUser = await prismadb.message.findUnique({
    where: { userId: userId },
  });
  console.log("existingUser", existingUser);
  if (existingUser) {
    await prismadb.message.update({
      where: { userId: userId },
      data: {
        count: existingUser.count + 1,
        answer: truncatedAnswer,
        question: truncatedQuestion,
      },
    });
    return true;
  } else {
    await prismadb.message.create({
      data: {
        userId: userId,
        count: 1,
        answer: truncatedAnswer,
        question: truncatedQuestion,
      },
    });
    return false;
  }
};


//mongo db 

// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
// import Message from "@/models/messageModel"; // Import the MongoDB Message model
// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// // Function to save message data to MongoDB
// export const saveMessageData = async (question: string, answer: string, chatId: string) => {
//   try {
//     // Save message data to MongoDB
//     await Message.create({ question, answer, chat: chatId });
//   } catch (error) {
//     console.error("Error saving message data:", error);
//     throw new Error("Failed to save message data");
//   }
// };

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages } = body;

//     console.log(messages, "messages");
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

//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages,
//     });
//     const responseData = response.data.choices[0].message;

//     if (!isPro) {
//       await incrementApiLimit();
//       if (messages.length > 1) {
//         // Save message data to MongoDB
//         await saveMessageData(
//           messages[messages.length - 1].content,
//           messages[messages.length - 2].content,
//           userId
//         );
//       }
//     }

//     return NextResponse.json(responseData);
//   } catch (error) {
//     console.log("[CONVERSATION_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
