import Mongoose from "mongoose";

const conversationSchema = new Mongoose.Schema(
  {
    participants: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default Mongoose.model("Conversation", conversationSchema);
