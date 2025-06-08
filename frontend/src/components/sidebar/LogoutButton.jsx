import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import "../../index.css";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto p-2 md:p-4 flex justify-center md:justify-end">
      {!loading ? (
        <button
          onClick={logout}
          className="p-2 rounded-full hover:bg-gray-600 transition-colors"
        >
          <BiLogOut className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
      ) : (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;



