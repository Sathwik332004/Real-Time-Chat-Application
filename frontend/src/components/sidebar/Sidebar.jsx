import Conversations from "./Conversations"; 
import SearchInput from "./SearchInput"; 
import LogoutButton from "./LogoutButton"; 
import { FaUser } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 
import "../../index.css"; 
const Sidebar = ({ closeSidebar }) => { 
return ( 
<div className="h-full flex flex-col bg-gray-900 text-white w-full sm:w-64 lg:w-72"> 
<div className="flex justify-between items-center p-4 bg-gray-800 border-b border-slate-700"> 
<span className="text-xl font-semibold text-white">ChatterBox</span> 
<div className="flex items-center gap-4"> 
<Link to="/profile" aria-label="View Profile"> 
<FaUser className="text-white text-2xl hover:text-blue-500 cursor-pointer" /> 
</Link> 
</div> 
    </div> 
    <div className="px-2 sm:px-4 mt-2"> 
      <SearchInput /> 
    </div> 
    <div className="my-2 sm:my-4 border-t border-slate-600 w-full"></div> 
      <div className="flex-1 overflow-y-auto px-2 sm:px-4"> 
        <Conversations /> 
      </div> 
      <div className="mt-4 px-2 sm:px-4"> 
        <LogoutButton /> 
      </div> 
    </div> 
  ); 
}; 
 
export default Sidebar; 