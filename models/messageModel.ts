import { Document, model, Schema } from "mongoose";
export interface IMessage extends Document {
  question: string;
  answer: string;
  chat: Schema.Types.ObjectId;
}

const messageSchema = new Schema<IMessage>(
  {
    question: { type: String, trim: true },
    answer: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

const MessageDocument = model<IMessage>("Message", messageSchema);
export default MessageDocument;
