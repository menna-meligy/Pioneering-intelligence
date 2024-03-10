import mongoose, { Model, Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    question: { type: String, trim: true },
    answer: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

// Define the message model
const MessageModel: Model<any> = mongoose.model("Message", messageSchema);

export { MessageModel };
