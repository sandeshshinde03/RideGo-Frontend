// Frontend/src/pages/UserLogout.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Logout failed:", error);
        // Optional: clear token and navigate anyway
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    };

    logoutUser();
  }, [token, navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
