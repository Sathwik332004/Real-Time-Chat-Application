import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetProfile = (userId) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const { authUser } = useAuthContext(); // Get current user's data

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      try {
        // Fetch current user's profile if no userId is provided
        const endpoint = userId 
          ? `/api/auth/profile/${userId}` 
          : `/api/auth/profile`;
        
        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${authUser.token}`, // Send JWT token
          },
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setProfile(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [userId, authUser.token]); // Re-fetch when userId or token changes

  return { loading, profile };
};

export default useGetProfile;
