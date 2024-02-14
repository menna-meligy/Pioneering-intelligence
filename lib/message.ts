import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// export const saveMessageData = async (question: string, answer: string) => {
//   console.log("Saving message data...");
//   console.log("Question:", question);
//   console.log("Answer:", answer);

//   const { userId } = auth();
//   console.log("User ID:", userId);

//   try {
//     if (!userId) {
//       console.log("User ID:", userId);
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const existingUser = await prismadb.message.findUnique({
//       where: { userId: userId },
//     });

//     console.log("Existing User:", existingUser);
//     console.log("User ID:", userId);
//     if (existingUser) {
//       await prismadb.userApiLimit.update({
//         where: { userId: userId },
//         data: { count: existingUser.count + 1 },
//       });
//     } else {
//       await prismadb.userApiLimit.create({
//         data: { userId: userId, count: 1 },
//       });
//       console.log("User ID:", userId);
//       console.log("Message data saved successfully.");

//       return "Success";
//     }
//   } catch (error) {
//     console.log("error", error);
//     console.error("Error saving message data:", error);
//     return null; // Indicate failure
//   }
// };
// //

export const saveMessageData = async (question: string, answer: string) => {
  const maxLength = 255; // Assuming the maximum length allowed is 255 characters

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
