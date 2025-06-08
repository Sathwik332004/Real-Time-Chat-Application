import Messages from "./Messages"; 
import MessageInput from "./MessageInput"; 
import { TiMessages } from "react-icons/ti"; 
import useConversation from "../../zustand/useConversation"; 
import { useEffect } from "react"; 
import { useAuthContext } from "../../context/AuthContext"; 
import ChatHeader from "./ChatHeader"; 
import "../../index.css"; 
const MessageContainer = () => { 
const { selectedConversation, setSelectedConversation } = useConversation(); 
  const { authUser } = useAuthContext(); 
 
  useEffect(() => { 
    return () => setSelectedConversation(null); 
  }, [setSelectedConversation]); 
 
  if (!selectedConversation) { 
    return ( 
      <div className="flex items-center justify-center w-full h-full p-4"> 
        <div className="text-center text-white"> 
          <p className="text-xl md:text-2xl font-semibold mb-3"> 
            Welcome 👋 {authUser.fullName} 
          </p> 
          <p className="text-gray-400 text-sm md:text-base mb-6"> 
            Select a chat to start messaging 
          </p> 
          <TiMessages className="text-4xl md:text-6xl text-gray-500 mx-auto" /> 
        </div> 
      </div> 
    ); 
  } 
 
    return ( 
    <div className="flex flex-col h-full bg-gray-800"> 
      <ChatHeader selectedConversation={selectedConversation} /> 
 
      <div className="bg-slate-500 px-4 py-2 flex items-center gap-14 md:hidden"> 
        <button 
          onClick={() => setSelectedConversation(null)} 
          className="text-white font-bold" 
        > 
          ← 
        </button> 
        <span className="text-white font-bold"> 
          {selectedConversation.fullName} 
        </span> 
      </div> 
 
      <Messages /> 
      <MessageInput /> 
    </div> 
  ); 
}; 
 
export default MessageContainer;