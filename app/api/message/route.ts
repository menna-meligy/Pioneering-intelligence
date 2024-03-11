import { Message } from "@/models/chatModel";
import connectDB from "@/mongoConfig/db";
import { NextResponse } from "next/server";

// Create a new message
// export async function POST(request: any) {
//   try {
//     // const body = JSON.parse(request.body);

//     // const { question, responseData } = body;
//     console.log("from post message");
//     const { question, responseData } = await request.json();
//     console.log(question, "question from post");
//     console.log(responseData, "responseData from post");
//     if (!question || !responseData) {
//       throw new Error("Question or response data is missing.");
//     }
//     await connectDB();
//     await Message.create({ question, answer: responseData });
//     return NextResponse.json({ message: "Message Created" }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating message:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
export async function POST(request: any) {
  try {
    const { question, responseData, chatId } = await request.json();
    if (!question || !responseData || !chatId) {
      throw new Error("Question, response data, or chat ID is missing.");
    }
    await connectDB();
    const createdMessage = await Message.create({ question, answer: responseData, chatId });
    return NextResponse.json({ message: "Message Created", data: createdMessage }, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a message by ID
export async function DELETE(request: any) {
  const messageId = request.params.id;
  try {
    await connectDB();
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Message deleted" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
