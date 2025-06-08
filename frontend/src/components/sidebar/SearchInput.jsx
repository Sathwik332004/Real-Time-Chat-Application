import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import "../../index.css";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) return toast.error("Search must be at least 3 characters long");
    
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    conversation ? setSelectedConversation(conversation) : toast.error("No such user found");
    setSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 md:gap-3 w-full">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full flex-1 min-w-0
                   text-sm md:text-base
                   px-4 py-2 md:px-6 md:py-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-sky-500 text-white 
                   flex-shrink-0
                   btn-sm md:btn-md
                   hover:bg-sky-600 md:hover:bg-sky-600
                   p-2 md:p-3"
      >
        <IoSearchSharp className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </form>
  );
};

export default SearchInput;
