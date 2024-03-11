import { Chat } from "@/models/chatModel";
import connectDB from "@/mongoConfig/db";
import { NextResponse } from "next/server";

// export async function PUT(request: any, { params }: any) {
//   try {
//     const { id } = params;
//     const { newName } = await request.json();
//     await connectDB();

//     // Find the chat by id and update its name
//     const updatedChat = await Chat.findByIdAndUpdate(id, { name: newName });

//     if (!updatedChat) {
//       return NextResponse.json({ message: "Chat not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Topic updated" }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating chat:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
export async function PUT(request: any, { params }: any) {
  try {
    const { id } = params;
    const { messageObject } = await request.json(); // Assuming messageId contains the ID of the existing message
    await connectDB();

    // Find the chat by id
    const chat = await Chat.findById(id);

    if (!chat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    // Update the chat by pushing the ID of the existing message to its messages array
    console.log("messageId from PUT", messageObject.question);
    console.log("messageId from PUT", messageObject.responseData);
    console.log("messageId from PUT", messageObject._id);
    await chat.updateOne({ $push: { messages: messageObject } });

    return NextResponse.json(
      { message: "Message added to chat" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding message to chat:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// import connectMongoDB from "@/libs/mongodb";
// import Topic from "@/models/topic";
// import { NextResponse } from "next/server";

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Topic.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }

export async function GET(request: any, { params }: any) {
  const { id } = params;
  await connectDB();
  const chat = await Chat.findOne({ _id: id });
  return NextResponse.json({ chat }, { status: 200 });
}
