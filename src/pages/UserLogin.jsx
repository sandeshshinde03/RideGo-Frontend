// Frontend/src/pages/UserLogin.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        { email, password }
      );
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      {/* Left panel: login form */}
      <div
        className="relative w-full sm:min-w-[350px] sm:w-[400px] h-full bg-white overflow-hidden flex flex-col justify-between bg-cover bg-center"
        style={{ backgroundImage: "url('/IMG/GoRide-Mobile.png')" }}
      >
        {/* Logo */}
        <img src="/IMG/logo.png" alt="Logo" className="h-20 object-contain m-4 self-start" />

        {/* Login form */}
        <div className="flex flex-col bg-white p-6 gap-6 rounded-t-lg">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center">User Login</h1>

          <form onSubmit={submithandler} className="flex flex-col gap-4">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-black hover:bg-gray-900 text-white font-semibold rounded px-4 py-2 w-full text-lg"
            >
              Log In
            </button>
          </form>

          <p className="text-center">
            New to GoRide?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create new account
            </Link>
          </p>

          <Link
            to="/captain-login"
            className="bg-green-600 hover:bg-green-700 transition flex items-center justify-center text-white font-semibold rounded px-4 py-2 w-full text-lg"
          >
            Switch to Captain Login
          </Link>
        </div>
      </div>

      {/* Right panel: hero image for large screens */}
      <div className="hidden sm:block w-full h-full bg-[#eae1fe] overflow-hidden select-none border-l-2 border-black">
        <img
          className="h-full object-cover mx-auto select-none"
          src="/IMG/GoRide-Laptop.png"
          alt="Side image"
        />
      </div>
    </div>
  );
};

export default UserLogin;