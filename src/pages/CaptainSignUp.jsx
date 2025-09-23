// Frontend/src/pages/CaptainSignUp.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignUp = () => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const submithandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstname.trim(),
        lastname: lastname.trim() || "",
      },
      email: email.trim(),
      password: password.trim(),
      vehicle: {
        vehicleType,
        color: vehicleColor.trim(),
        plate: vehiclePlate.trim(),
        capacity: Number(vehicleCapacity),
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem("Token", response.data.token);
        navigate("/captain-home");
      }

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setVehicleType("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      {/* Left panel: signup form */}
      <div
        className="relative w-full sm:min-w-[350px] sm:w-[400px] h-full bg-white overflow-hidden flex flex-col justify-between bg-cover bg-center"
        style={{ backgroundImage: "url('/GoRide-Mobile.png')" }}
      >
        {/* Logo */}
        <img
          src="/captain.png"
          alt="Captain Logo"
          className="h-12 object-contain m-4 self-start"
        />

        {/* Signup form */}
        <div className="flex flex-col bg-white p-6 gap-6 rounded-t-lg">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center">
            Create Captain Account
          </h1>

          <form onSubmit={submithandler} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex gap-4">
              <input
                required
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Email & Password */}
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Vehicle Info */}
            <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="bike">Bike</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
              </select>
              <input
                required
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                required
                type="text"
                placeholder="Plate Number"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                required
                type="number"
                min="1"
                placeholder="Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="bg-black hover:bg-gray-900 text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
            >
              Create Captain Account
            </button>
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600 hover:underline">
              Log In here
            </Link>
          </p>

          <p className="text-[10px] leading-tight text-center">
            By proceeding, you consent to receive calls, WhatsApp, or SMS
            messages from GoRide.
          </p>
        </div>
      </div>

      {/* Right panel: hero image for large screens */}
      <div className="hidden sm:block w-full h-full bg-[#eae1fe] overflow-hidden select-none border-l-2 border-black">
        <img
          className="h-full object-cover mx-auto select-none"
          src="/GoRide-Laptop.png"
          alt="Side image"
        />
      </div>
    </div>
  );
};

export default CaptainSignUp;
