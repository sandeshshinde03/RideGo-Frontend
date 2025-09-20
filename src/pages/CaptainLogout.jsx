import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const token = localStorage.getItem("Token"); // note: captain token key
  const navigate = useNavigate();

  useEffect(() => {
    const logoutCaptain = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("Token");
          navigate("/captain-login", { replace: true });
        }
      } catch (error) {
        console.error("Captain logout failed:", error);
        // Clear token and navigate anyway
        localStorage.removeItem("Token");
        navigate("/captain-login", { replace: true });
      }
    };

    logoutCaptain();
  }, [token, navigate]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
