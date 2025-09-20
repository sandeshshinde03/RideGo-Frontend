// frontend/src/pages/Home.jsx
import React, { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.user?._id) return;
    socket.emit("join", { userType: "user", userId: user.user._id });

    const handleRideConfirmed = (ride) => {
      //console.log("✅ ride-confirmed event received:", ride);
      setRide(ride);
      setVehiclePanel(false);
      setConfirmRidePanel(false);
      setVehicleFound(false);
      setWaitingForDriver(true);
    };

    const handleRideStarted = (ride) => {
      //console.log("🚗 ride-started event received:", ride);
      setWaitingForDriver(false);
      navigate("/riding", { state: { ride } });
    };

    socket.on("ride-confirmed", handleRideConfirmed);
    socket.on("ride-started", handleRideStarted);

    return () => {
      socket.off("ride-confirmed", handleRideConfirmed);
      socket.off("ride-started", handleRideStarted);
    };
  }, [socket, user, navigate]);

  const submitHandler = (e) => e.preventDefault();

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%", padding: "24px" });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: "0%", padding: "0px" });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, { y: vehiclePanel ? 0 : "100%" });
  }, [vehiclePanel]);
  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, { y: confirmRidePanel ? 0 : "100%" });
  }, [confirmRidePanel]);
  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, { y: vehicleFound ? 0 : "100%" });
  }, [vehicleFound]);
  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, { y: waitingForDriver ? 0 : "100%" });
  }, [waitingForDriver]);

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFare(response.data.fare);
    } catch (err) {
      console.error(err);
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        vehicleType,
        pickup,
        destination,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    //console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden flex justify-center items-start sm:items-center bg-gray-100">
      {/* Background image for large screens */}
      <div className="hidden lg:block absolute inset-0">
        <img
          src="/IMG/GoRide-Laptop.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Centered mobile layout */}
      <div className="relative w-full max-w-md flex flex-col justify-end h-screen z-10">
        <div className="absolute inset-0 z-0">
          <LiveTracking />
        </div>

        <div className="flex flex-col justify-end h-screen absolute top-0 w-full z-10">
          <div className="h-[30%] p-6 bg-white relative rounded-t-2xl shadow-xl">
            <h5
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className="absolute right-6 top-6 text-2xl opacity-0 cursor-pointer"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>

            <h4 className="text-2xl font-semibold">Find a trip</h4>

            <form onSubmit={submitHandler}>
              <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setFocusedField("pickup");
                }}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
                type="text"
                placeholder="Add a pick-up location"
              />
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setFocusedField("destination");
                }}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                type="text"
                placeholder="Enter your destination"
              />
            </form>
            <button
              onClick={findTrip}
              className="w-full bg-black text-white font-semibold px-4 py-2 rounded-lg mt-4"
            >
              Find a ride
            </button>
          </div>

          <div ref={panelRef} className="bg-white h-0 overflow-y-auto">
            <LocationSearchPanel
              query={focusedField === "pickup" ? pickup : destination}
              setPickup={setPickup}
              setDestination={setDestination}
              focusedField={focusedField}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
            />
          </div>
        </div>

        {/* Panels */}
        {/* vehicle panel */}
        <div
          ref={vehiclePanelRef}
          className="fixed z-10 bottom-0 inset-x-0 translate-y-full flex justify-center pointer-events-none"
        >
          {/* pointer-events-none on outer keeps the offscreen area non-interactive while inner receives events */}
          <div className="pointer-events-auto bg-white w-full max-w-md px-4 py-10 pt-12 rounded-t-2xl shadow-xl">
            <VehiclePanel
              setVehicleType={setVehicleType}
              fare={fare}
              setConfirmRidePanel={setConfirmRidePanel}
              setVehiclePanel={setVehiclePanel}
            />
          </div>
        </div>

        {/* confirm ride panel */}
        <div
          ref={confirmRidePanelRef}
          className="fixed z-10 bottom-0 inset-x-0 translate-y-full flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto bg-white w-full max-w-md px-4 py-6 pt-12 rounded-t-2xl shadow-xl">
            <ConfirmRide
              createRide={createRide}
              pickup={pickup}
              fare={fare}
              vehicleType={vehicleType}
              destination={destination}
              setConfirmRidePanel={setConfirmRidePanel}
              setVehicleFound={setVehicleFound}
            />
          </div>
        </div>

        {/* looking for driver */}
        <div
          ref={vehicleFoundRef}
          className="fixed z-10 bottom-0 inset-x-0 translate-y-full flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto bg-white w-full max-w-md px-4 py-6 pt-12 rounded-t-2xl shadow-xl">
            <LookingForDriver
              createRide={createRide}
              pickup={pickup}
              fare={fare}
              vehicleType={vehicleType}
              destination={destination}
              setVehicleFound={setVehicleFound}
            />
          </div>
        </div>

        {/* waiting for driver */}
        <div
          ref={waitingForDriverRef}
          className="fixed z-10 bottom-0 inset-x-0 translate-y-full flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto bg-white w-full max-w-md px-4 py-6 pt-12 rounded-t-2xl shadow-xl">
            <WaitingForDriver
              ride={ride}
              setVehicleFound={setVehicleFound}
              setWaitingForDriver={setWaitingForDriver}
              waitingForDriver={waitingForDriver}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
