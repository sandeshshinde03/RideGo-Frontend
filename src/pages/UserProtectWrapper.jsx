//Frontend\src\pages\UserProtectWrapper.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext"; 

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token"); 
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUser]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default UserProtectWrapper;
