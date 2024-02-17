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
