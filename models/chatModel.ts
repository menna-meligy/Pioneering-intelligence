// import mongoose, { Model, Schema, Types } from "mongoose";

// const chatSchema = new Schema(
//   {
//     chatName: { type: String, trim: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//     uId: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const ChatModel: Model<any> = mongoose.model("Chat", chatSchema);
// export { ChatModel };

import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", topicSchema);

export default Chat;
