// import { auth } from "@clerk/nextjs";
// import { saveMessageData, getMessageDataByUser } from "@/lib/message";
// import { NextResponse } from "next/server";
// // Example usage when saving message data
// const saveMessage = async () => {
//   const { userId } = auth(); // Retrieve user ID from authentication
//   const question = "How are you?";
//   const answer = "I'm fine, thank you!";

//   //   const user = await currentUser();

//   if (!userId) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const saved = await saveMessageData(userId, question, answer);
//   if (saved) {
//     console.log("Message data saved successfully");
//   } else {
//     console.error("Failed to save message data");
//   }
// };

// // Example usage when retrieving message data
// const retrieveMessageData = async () => {
//   const { userId } = auth(); // Retrieve user ID from authentication

//   if (!userId) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const messageData = await getMessageDataByUser(userId);
//   console.log("Message data:", messageData);
// };
