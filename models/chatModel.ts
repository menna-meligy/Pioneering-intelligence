import { Schema, Document, model, Types } from "mongoose";

export interface IChat extends Document {
  chatName: string;
  createdAt: Date;
  updatedAt: Date;
  uId: Types.ObjectId;
}

const chatSchema = new Schema<IChat>(
  {
    chatName: { type: String, trim: true },
    createdAt: { type: Date, trim: true },
    updatedAt: { type: Date, trim: true },
    uId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Chat = model<IChat>("Chat", chatSchema);
export default Chat;
