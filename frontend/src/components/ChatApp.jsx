import Sidebar from "./sidebar/Sidebar";
import MessageContainer from "./messages/MessageContainer";
import useConversation from "../zustand/useConversation";

const ChatApp = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-800 text-white">
      <div
        className={`
          w-full md:w-[350px] lg:w-[400px]
          ${selectedConversation ? "hidden" : "block"}
          md:block
        `}
      >
        <Sidebar />
      </div>
      <div
        className={`
          flex-1
          ${selectedConversation ? "block" : "hidden"}
          md:block
          bg-gray-800
        `}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default ChatApp;
