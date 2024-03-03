// pages/api/get-chats.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getChatsDB } from "@/lib/message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const chats = await getChatsDB();
    return res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
