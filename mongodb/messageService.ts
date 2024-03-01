import { auth } from "@clerk/nextjs";
import Chat, { IChat } from "@/models/chatModel";
import Message, { IMessage } from "@/models/messageModel";
import { Types } from "mongoose";

export const saveMessageData = async (question: string, answer: string) => {
  const maxLength = 100;

  const truncatedQuestion =
    question.length > maxLength ? question.slice(0, maxLength) : question;
  const truncatedAnswer =
    answer.length > maxLength ? answer.slice(0, maxLength) : answer;

  const { userId } = auth();
  if (!userId) {
    console.error("Error: Invalid userId provided");
    throw new Error("Invalid userId provided");
  }

  try {
    console.log("Saving message data...");
    console.log("Question:", question);
    console.log("Answer:", answer);

    const userIdString = String(userId);
    const userIdObjectId = new Types.ObjectId(userId);

    let chat: IChat | null = await Chat.findOne({ uId: userIdObjectId });

    if (!chat) {
      chat = new Chat({
        chatName: "Chat",
        uId: userIdObjectId,
      });
      await chat.save();
    }

    const newMessage = new Message({
      question: truncatedQuestion,
      answer: truncatedAnswer,
      chat: chat._id,
    });

    await newMessage.save();

    console.log("Message data saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving message data:", error);
    throw error;
  }
};
