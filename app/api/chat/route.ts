import { Chat, Message } from "@/models/chatModel";
import connectDB from "@/mongoConfig/db";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const { newChatName } = await request.json();
    await connectDB();
    await Chat.create({ name: newChatName });
    return NextResponse.json({ message: "Chat Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function POST(request: any) {
//   try {
//     const { chatId, messageData } = await request.json(); // Assuming messageData contains the message content
//     await connectDB();

//     // Find the chat based on the provided chatId
//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return NextResponse.json({ message: "Chat not found" }, { status: 404 });
//     }

//     // Create a new message associated with the chat
//     const newMessage = await Message.create({ chatId, ...messageData });

//     // Push the ID of the new message to the chat's messages array
//     await chat.updateOne({ $push: { messages: newMessage._id } });

//     return NextResponse.json({ message: "Message created" }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating message:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    await connectDB();
    const chats = await Chat.find({}, { messages: 0 });
    return NextResponse.json({ chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: any) {
  const chatId = request.nextUrl.searchParams.get("id");
  if (!chatId) {
    return NextResponse.json(
      { message: "Chat ID is missing" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const deletedChat = await Chat.findByIdAndDelete(chatId);
    if (!deletedChat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Chat deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
