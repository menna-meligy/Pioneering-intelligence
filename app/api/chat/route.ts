import Chat from "@/models/chatModel";
import connectDB from "@/mongoConfig/db";
import { NextResponse } from "next/server";

// export async function POST(request: any) {
//   try {
//     const { chatName } = await request.json();
//     await connectDB();
//     await Chat.create({ name: chatName });
//     return NextResponse.json({ message: "Chat Created" }, { status: 201 });
//   } catch (error) {
//     console.error("Error fetching chats:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
export async function POST(request: any) {
  try {
    const { newChatName } = await request.json(); // Extract newChatName from JSON body
    await connectDB();
    await Chat.create({ name: newChatName }); // Create chat with the extracted name
    return NextResponse.json({ message: "Chat Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const chats = await Chat.find();
  return NextResponse.json({ chats });
}
