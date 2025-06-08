import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const ChatHeader = ({ selectedConversation }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-slate-700">
      {/* Conversation partner info or fallback */}
      <div className="flex items-center gap-3">
        {selectedConversation ? (
          <>
            <img
              src={selectedConversation.profilePic || "/default_profile.png"}
              alt={selectedConversation.fullName}
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
            />
            <span className="text-white font-semibold text-base md:text-lg">
              {selectedConversation.fullName}
            </span>
          </>
        ) : (
          <span className="text-white font-semibold text-base md:text-lg">
            Chat
          </span>
        )}
      </div>

      {/* Notification bell and profile icon */}
      <div className="flex items-center gap-4">
        <Link
          to={
            selectedConversation
              ? `/profile/${selectedConversation._id}`
              : "/profile"
          }
          aria-label="View Profile"
        >
          <FaUser className="text-white text-2xl hover:text-blue-500 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default ChatHeader;
