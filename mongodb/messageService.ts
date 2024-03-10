import { auth } from "@clerk/nextjs";
import {ChatModel } from "@/models/chatModel";
import {MessageModel } from "@/models/messageModel";

export const saveMessageData = async (question: string, answer: string) => {
  const maxLength = 100;

  const truncatedQuestion =
    question.length > maxLength ? question.slice(0, maxLength) : question;
  const truncatedAnswer =
    answer.length > maxLength ? answer.slice(0, maxLength) : answer;

  try {
    const { userId } = auth();
    console.log("userId:", userId); // Log userId for debugging

    if (!userId) {
      console.error("Error: Invalid userId provided");
      throw new Error("Invalid userId provided");
    }

    // Your logic here for creating or finding the chat associated with the userId
    let chat = await ChatModel.findOne({ uId: userId });

    if (!chat) {
      // If chat doesn't exist, create a new one
      chat = await ChatModel.create({
        chatName: "Default Chat Name", // You can customize this as needed
        uId: userId,
      });
    }

    // Create and save the new message
    const newMessage = new MessageModel({
      question: truncatedQuestion,
      answer: truncatedAnswer,
      chat: chat._id, // Associate the message with the chat
    });

    await newMessage.save();

    console.log("Message data saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving message data:", error);
    throw error;
  }
};
