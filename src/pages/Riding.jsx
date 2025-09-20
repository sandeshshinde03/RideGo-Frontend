import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking"; // <-- import LiveTracking

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="h-screen relative flex justify-center bg-gray-100">
      {/* Background image for large screens */}
      <div className="hidden lg:block absolute inset-0">
        <img
          src="/GoRide-Laptop.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Container to match CaptainRiding size */}
      <div className="relative w-full max-w-md flex flex-col h-screen z-10">
        {/* Top home button */}
        <div className="fixed p-6 top-0 flex items-center justify-between w-full max-w-md mx-auto">
          <Link
            to="/home"
            className="fixed top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-20"
          >
            <i className="text-lg font-medium ri-home-5-line"></i>
          </Link>
        </div>

        {/* Live Tracking section (instead of GIF) */}
        <div className="h-1/2">
          <LiveTracking />
        </div>

        {/* Ride info panel */}
        <div className="h-1/2 p-6 bg-white rounded-t-2xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <img className="h-12" src="\IMG\CarPng.png" alt="CarPNG" />
            <div className="text-right">
              <h2 className="text-lg font-medium capitalize">
                {ride?.captain.fullname.firstname}
              </h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">
                {ride?.captain.vehicle.plate}
              </h4>
              <p className="text-sm text-gray-600 capitalize">
                Vehicle Color: {ride?.captain.vehicle.color}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-5 w-full">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">567-12-A</h3>
                <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg">
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
