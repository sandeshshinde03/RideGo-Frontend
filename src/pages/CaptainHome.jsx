import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              lng: position.coords.longitude,
              lat: position.coords.latitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [socket, captain._id]);

  useEffect(() => {
    socket.on("new-ride", (data) => {
      setRide(data);
      setRidePopupPanel(true);
    });

    return () => {
      socket.off("new-ride");
    };
  }, [socket]);

  async function confirmRide() {
    try {
      const token = localStorage.getItem("Token");
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (err) {
      console.error("Confirm ride error:", err);
    }
  }

  // GSAP animations
  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      y: ridePopupPanel ? 0 : "100%",
      duration: 0.8,
      ease: "power3.out",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      y: confirmRidePopupPanel ? 0 : "100%",
      duration: 0.8,
      ease: "power3.out",
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen relative overflow-hidden flex justify-center items-start sm:items-center bg-gray-100">
      {/* Background image for large screens */}
      <div className="hidden lg:block absolute inset-0">
        <img
          src="/GoRide-Laptop.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile/centered layout */}
      <div className="relative w-full max-w-md flex flex-col justify-end h-screen z-10 bg-transparent">
        {/* Top navbar */}
        <div className="fixed top-0 left-0 right-0 flex items-center justify-between w-full max-w-md mx-auto px-6 py-6 z-20">
          <Link
            to="/captain-home"
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
          >
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>

        {/* Body */}
        <div className="relative w-full flex flex-col justify-end h-screen">
          {/* Live tracking map */}
          <div className="h-[70%]">
            <LiveTracking />
          </div>

          {/* Captain details */}
          <div className="h-[30%] p-6 bg-white rounded-t-2xl shadow-xl">
            <CaptainDetails />
          </div>

          {/* Ride popup panel */}
          <div
            ref={ridePopupPanelRef}
            className="fixed z-20 bottom-0 inset-x-0 translate-y-full flex justify-center pointer-events-none"
          >
            <div className="pointer-events-auto bg-white w-full max-w-md px-4 py-10 pt-12 rounded-t-2xl shadow-xl">
              <RidePopUp
                ride={ride}
                setRidePopupPanel={setRidePopupPanel}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                confirmRide={confirmRide}
              />
            </div>
          </div>

          {/* Confirm ride popup panel */}
          <div
            ref={confirmRidePopupPanelRef}
            className="fixed z-20 bottom-0 inset-x-0 translate-y-full flex justify-center pointer-events-none"
          >
            <div className="pointer-events-auto bg-white w-full max-w-md px-4 py-10 pt-12 rounded-t-2xl shadow-xl">
              <ConfirmRidePopup
                ride={ride}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                setRidePopupPanel={setRidePopupPanel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
