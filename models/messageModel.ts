// messageModel.ts
import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { IChat } from "./chatModel";

export interface IMessage extends Document {
  question: string;
  answer: string;
  chat: Types.ObjectId | IChat; // Change the type to accept either ObjectId or IChat
}

const messageSchema = new Schema<IMessage>(
  {
    question: { type: String, trim: true },
    answer: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" }, // Reference the Chat model
  },
  {
    timestamps: true,
  }
);

const MessageModel: Model<IMessage> =
  (mongoose.models.Message as Model<IMessage>) ||
  mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
