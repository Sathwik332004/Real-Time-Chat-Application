import Mongoose from "mongoose";
const messageSchema = new Mongoose.Schema(
  {
    senderId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false, // New field: false means unread
    },
    // createdAt, updatedAt
  },
  { timestamps: true }
);

const Message = Mongoose.model("Message", messageSchema);

export default Message;

