import { Message } from "@/models/chatModel";
import connectDB from "@/mongoConfig/db";
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
  const { id } = params;
  await connectDB();
  const chat = await Message.findOne({ _id: id });
  return NextResponse.json({ chat }, { status: 200 });
}
