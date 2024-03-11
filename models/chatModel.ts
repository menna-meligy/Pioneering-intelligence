import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    question: { type: String, trim: true },
    answer: { type: String, trim: true },
    chatId: { type: Schema.Types.ObjectId, ref: "Chat" }, // Reference to the chat it belongs to
  },
  {
    timestamps: true,
  }
);

const chatSchema = new Schema(
  {
    name: String,
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export { Chat, Message };
