import prismadb from "@/lib/prismadb";
import { v4 as uuidv4 } from "uuid";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// export const saveMessageData = async (question: string, answer: string) => {
//   const maxLength = 100; // Assuming the maximum length allowed is 255 characters

//   const truncatedQuestion =
//     question.length > maxLength ? question.slice(0, maxLength) : question;
//   const truncatedAnswer =
//     answer.length > maxLength ? answer.slice(0, maxLength) : answer;

//   const { userId } = auth();
//   console.log("uuuuuuuuuuuuuuuuuuuuuuuu", userId);
//   if (!userId) {
//     console.log("uuuuuuuuuuuuuuuuuuuuuuuu", userId);
//     return false;
//   }

//   console.log("Saving message data...");
//   console.log("Question:", question);
//   console.log("Answer:", answer);

//   const existingUser = await prismadb.message.findUnique({
//     where: { userId: userId },
//   });
//   console.log("existingUser", existingUser);
//   if (existingUser) {
//     await prismadb.message.update({
//       where: { userId: userId },
//       data: {
//         count: existingUser.count + 1,
//         answer: truncatedAnswer,
//         question: truncatedQuestion,
//       },
//     });
//     return true;
//   } else {
//     await prismadb.message.create({
//       data: {
//         userId: userId,
//         count: 1,
//         answer: truncatedAnswer,
//         question: truncatedQuestion,
//       },
//     });
//     return false;
//   }
// };

// export const saveQuestion = async (question: string, userId: string) => {
//   console.log("saveee");
//   const maxLength = 100; // Assuming the maximum length allowed is 255 characters
//   const truncatedQuestion =
//     question.length > maxLength ? question.slice(0, maxLength) : question;

//   // const { userId } = auth();
//   if (!userId) {
//     console.log("userId", userId);
//     return false;
//   }

//   console.log("Saving question...");
//   console.log("Question:", question);

//   try {
//     await prismadb.message.create({
//       data: {
//         userId: userId,
//         question: truncatedQuestion,
//       },
//     });
//     return true;
//   } catch (error) {
//     console.error("Error saving question:", error);
//     return false;
//   }
// };

// export const saveAnswer = async (answer: string, userId: string) => {
//   console.log("answer");
//   const maxLength = 100; // Assuming the maximum length allowed is 255 characters
//   const truncatedAnswer =
//     answer.length > maxLength ? answer.slice(0, maxLength) : answer;

//   // const { userId } = auth();
//   if (!userId) {
//     return false;
//   }

//   console.log("Saving answer...");
//   console.log("Answer:", answer);

//   try {
//     const existingQuestion = await prismadb.message.findFirst({
//       where: { userId: userId },
//       orderBy: { createdAt: "desc" },
//     });

//     if (existingQuestion) {
//       await prismadb.message.update({
//         where: { id: existingQuestion.id },
//         data: {
//           count: existingQuestion.count + 1,
//           answer: truncatedAnswer,
//         },
//       });
//       return true;
//     } else {
//       return false; // No question found to associate with the answer
//     }
//   } catch (error) {
//     console.error("Error saving answer:", error);
//     return false;
//   }
// };

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
// export const createChatDB = async (chatName: string) => {
//   try {
//     const newChat = await prismadb.chat.create({
//       data: {
//         name: chatName,
//       },
//     });
//     return newChat;
//   } catch (error) {
//     console.error("Error creating chat:", error);
//     return null;
//   }
// };

export async function createChatDB(chatName: string) {
  try {
    // Generate a new ID for the chat
    const chatId = uuidv4();
    console.log("ccc", chatName);
    // Create a new chat document with the provided name and generated ID
    const newChat = await prismadb.chat.create({
      data: {
        id: chatId,
        name: chatName,
      },
    });

    // Return the new chat
    return newChat;
  } catch (error) {
    // If an error occurs, log it and return null
    console.error("Error creating chat:", error);
    return null;
  }
}
export const getChatMessagesDB = async (chatId: string) => {
  try {
    // Fetch messages for the specified chatId from the database
    const messages = await prismadb.message.findMany({
      where: {
        id: chatId,
      },
    });
    return messages;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  }
};

export const getChatsDB = async () => {
  try {
    // Fetch messages for the specified chatId from the database
    const chats = await prismadb.chat.findMany({});
    return chats;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  }
};

export const saveQuestionDB = async (question: string, chatId: string) => {
  const maxLength = 255; // Maximum length allowed for the question field

  if (!chatId) {
    return false;
  }

  console.log("Saving question...");
  console.log("Question:", question);

  try {
    const existingChat = await prismadb.chat.findUnique({
      where: { id: chatId },
    });

    // if (!existingChat) {
    //   // Create the chat if it doesn't exist
    //   const newChat = await createChat("Default Chat Name");
    //   if (!newChat) {
    //     return false; // Failed to create chat
    //   }
    //   chatId = newChat.id; // Update chatId with the ID of the newly created chat
    // }

    await prismadb.message.create({
      data: {
        chat: { connect: { id: chatId } },
        question:
          question.length > maxLength ? question.slice(0, maxLength) : question,
      },
    });
    return true;
  } catch (error) {
    console.error("Error saving question:", error);
    return false;
  }
};

export const saveAnswerDB = async (answer: string, chatId: string) => {
  const maxLength = 255; // Maximum length allowed for the answer field

  if (!chatId) {
    return false;
  }

  console.log("Saving answer...");
  console.log("Answer:", answer);

  try {
    const existingChat = await prismadb.chat.findUnique({
      where: { id: chatId },
    });

    // if (!existingChat) {
    //   // Create the chat if it doesn't exist
    //   const newChat = await createChat("Default Chat Name");
    //   if (!newChat) {
    //     return false; // Failed to create chat
    //   }
    //   chatId = newChat.id; // Update chatId with the ID of the newly created chat
    // }

    await prismadb.message.create({
      data: {
        chat: { connect: { id: chatId } },
        answer: answer.length > maxLength ? answer.slice(0, maxLength) : answer,
      },
    });
    return true;
  } catch (error) {
    console.error("Error saving answer:", error);
    return false;
  }
};
