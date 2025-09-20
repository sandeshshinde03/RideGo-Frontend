import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen relative flex justify-center">
      {/* Background image for large screens */}
      <div className="hidden lg:block absolute inset-0 z-[-2]">
        <img
          src="/GoRide-Laptop.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Container to match ConfirmRidePopup size */}
      <div className="w-full max-w-md flex flex-col justify-end relative h-screen">
        {/* Header */}
        <div className="fixed p-6 top-0 flex items-center justify-between w-full max-w-md mx-auto">
          <Link
            to="/captain-home"
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>

        {/* Ride info panel */}
        <div
          className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10 cursor-pointer"
          onClick={() => setFinishRidePanel(true)}
        >
          <h5 className="p-1 text-center w-[90%] absolute top-0">
            <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
          </h5>
          <h4 className="text-xl font-semibold">{"4 KM away"}</h4>
          <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
            Complete Ride
          </button>
        </div>

        {/* Finish ride panel */}
        <div
          ref={finishRidePanelRef}
          className="fixed w-full max-w-md z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12 mx-auto"
        >
          <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
        </div>

        {/* Live tracking background */}
        <div className="h-screen fixed w-full max-w-md top-0 z-[-1] mx-auto">
          <LiveTracking />
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
