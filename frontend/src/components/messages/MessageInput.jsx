import { useState } from "react";
import { BsSend, BsEmojiSmile } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import io from "socket.io-client";
import "../../index.css";

const socket = io();

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { loading, sendMessage } = useSendMessage();

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-2 md:px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 flex items-center gap-1 md:gap-2">
          <button 
            type="button" 
            onClick={() => setShowEmoji(!showEmoji)} 
            className="p-1 md:p-1.5"
          >
            <BsEmojiSmile className="text-lg md:text-xl" />
          </button>
          <button
            type="submit"
            onClick={() => setShowEmoji(false)}
            className="p-1 md:p-1.5"
          >
            {loading ? (
              <div className="loading loading-spinner text-sm md:text-md"></div>
            ) : (
              <BsSend className="text-lg md:text-xl" />
            )}
          </button>
        </div>
        
        {showEmoji && (
          <div className="absolute bottom-12 left-0 right-0 md:left-auto md:bottom-10">
            <Picker
              data={data}
              emojiSize={20}
              emojiButtonSize={28}
              onEmojiSelect={addEmoji}
              maxFrequentRows={0}
              className="w-full md:w-auto"
            />
          </div>
        )}

        <input
          type="text"
          className="border text-sm md:text-base rounded-lg block w-full p-2 md:p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </form>
  );
};

export default MessageInput;


