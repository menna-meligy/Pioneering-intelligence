// import prismadb from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs";

// export const saveMessageData = async (question: string, answer: string) => {
//   console.log("heekkkk");
//   console.log("q", question);
//   console.log("a", answer);
//   const { userId } = auth();
//   if (!userId) {
//     console.log("user not found");
//     return "Dummy answer";
//   }

//   try {
//     const existingUser = await prismadb.message.findUnique({
//       where: { userId: userId },
//     });

//     if (!existingUser) {
//       await prismadb.message.create({
//         data: {
//           userId: userId,
//           question: question,
//           answer: answer,
//           count: 1,
//         },
//       });
//       return "Dummy answer";
//     } else {
//       await prismadb.message.update({
//         where: { userId: userId },
//         data: {
//           count: existingUser.count + 1,
//           question: question,
//           answer: answer,
//         },
//       });
//       return "Dummy answer";
//     }
//   } catch (error) {
//     console.error("Error saving message data:", error);
//     return "Dummy answer"; // Indicate failure
//   }
// };
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const saveMessageData = async (question: string, answer: string) => {
  console.log("heekkkk");
  console.log("q", question);
  console.log("a", answer);

  const { userId } = auth();

  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const existingUser = await prismadb.message.findUnique({
      where: { userId: userId },
    });

    if (!existingUser) {
      await prismadb.message.create({
        data: {
          userId: userId,
          question: question,
          answer: answer,
          count: 1,
        },
      });
    } else {
      await prismadb.message.update({
        where: { userId: userId },
        data: {
          count: existingUser.count + 1,
          question: question,
          answer: answer,
        },
      });
    }

    return "Success";
  } catch (error) {
    console.error("Error saving message data:", error);
    return null; // Indicate failure
  }
};
