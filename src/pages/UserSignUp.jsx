// Frontend/src/pages/UserSignUp.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstname, lastname },
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen flex items-center">
      {/* Left panel: signup form */}
      <div
        className="relative w-full sm:min-w-[350px] sm:w-[400px] h-full bg-white overflow-hidden flex flex-col justify-between bg-cover bg-center"
        style={{ backgroundImage: "url('/IMG/GoRide-Mobile.png')" }}
      >
        {/* Logo */}
        <img src="/IMG/logo.png" alt="Logo" className="h-12 object-contain m-4 self-start" />

        {/* Signup form */}
        <div className="flex flex-col bg-white p-6 gap-6 rounded-t-lg">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center">Create Account</h1>

          <form onSubmit={submithandler} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                required
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="bg-black hover:bg-gray-900 text-white font-semibold rounded px-4 py-2 w-full text-lg"
            >
              Create Account
            </button>
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In here
            </Link>
          </p>

          <p className="text-[10px] leading-tight text-center">
            By proceeding, you consent to get calls, WhatsApp or SMS messages
            (including by automated means) from GoRide and its affiliates to the
            number provided
          </p>
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

export default UserSignUp;
