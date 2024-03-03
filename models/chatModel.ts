// chatModel.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IChat extends Document {
  chatName: string;
  createdAt: Date;
  updatedAt: Date;
  uId: string; // Change the type to string
}

const chatSchema = new Schema<IChat>(
  {
    chatName: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    uId: { type: String, required: true }, // Update the type to string
  },
  {
    timestamps: true,
  }
);

const ChatModel: Model<IChat> =
  (mongoose.models.Chat as Model<IChat>) ||
  mongoose.model<IChat>("Chat", chatSchema);

export default ChatModel;
