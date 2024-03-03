import { Request, Response } from "express";
import { createChatDB, getChatsDB } from "../../../lib/message";
import { NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("req", req);
    console.log("req meth", req.method);
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // Parse the request body
    const { newChatName } = req.body;
    console.log("newChatName", newChatName);
    if (!newChatName) {
      return res.status(400).json({ error: "New chat name is required" });
    }

    // Create the chat
    const newChat = await prismadb.chat.create({
      data: {
        name: newChatName,
      },
    });

    // Return the newly created chat
    return res
      .status(201)
      .json({ message: "Chat created successfully", data: newChat });
  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function GET() {
  try {
    const chats = await getChatsDB();
    return new NextResponse(JSON.stringify(chats));
  } catch (error: any) {
    console.error("Error fetching chats:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
