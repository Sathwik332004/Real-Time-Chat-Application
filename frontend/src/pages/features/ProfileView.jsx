import { useParams, Link } from "react-router-dom";
import useGetProfile from "../../hooks/useGetProfile";

const ProfileView = () => {
  const { userId } = useParams();
  const { loading, profile } = useGetProfile(userId);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:w-96 sm:mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <div className="flex flex-col items-center gap-4">
          <img
            src={profile.profilePic || "/default_profile.png"}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <div className="w-full text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-300">
              {profile.fullName || "User"}
            </h2>
            <p className="text-gray-400">{profile.username || "@username"}</p>
            <p className="text-gray-400">{profile.email || "email@example.com"}</p>
            <p className="text-gray-400">{profile.gender || "email@example.com"}</p>

          </div>
          <div className="flex flex-col gap-2 w-full mt-4">
            <Link to="/" className="btn btn-sm btn-outline">
              Back to Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
