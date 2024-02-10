import prismadb from "@/lib/prismadb";

export const saveMessageData = async (
  userId: string,
  question: string,
  answer: string
): Promise<boolean> => {
  try {
    const existingUser = await prismadb.user.findUnique({
      where: { id: userId },
      select: {},
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    await prismadb.message.create({
      data: {
        userId: userId,
        question: question,
        answer: answer,
      },
    });

    return true; // Indicate successful saving
  } catch (error) {
    console.error("Error saving message data:", error);
    return false; // Indicate failure
  }
};

export const getMessageDataByUser = async (userId: string): Promise<any[]> => {
  try {
    const messages = await prismadb.message.findMany({
      where: { userId: userId },
    });
    return messages;
  } catch (error) {
    console.error("Error retrieving message data:", error);
    return [];
  }
};
