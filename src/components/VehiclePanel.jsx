// frontend/src/components/VehiclePanel.jsx
import React from "react";

const VehiclePanel = (props) => {
  return (
    <div className="relative">
   
      <div
        className="absolute top-[-30px] left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => props.setVehiclePanel(false)}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-400 hover:text-black"></i>
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-semibold mb-6 text-center">Choose a vehicle</h3>

      <div className="space-y-4">
        {/* Car */}
        <div
          onClick={() => {
            props.setConfirmRidePanel(true);
            props.setVehicleType("car");
          }}
          className="flex items-center justify-between border-2 border-transparent hover:border-black bg-gray-100 rounded-xl p-3 cursor-pointer transition"
        >
          <img className="h-10 w-auto" src="/IMG/CarPng.png" alt="Car" />
          <div className="w-1/2 px-2">
            <h4 className="font-medium text-base flex items-center gap-1">
              RideGo <i className="ri-user-3-fill text-gray-600 text-sm"></i> 4
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, Compact rides
            </p>
          </div>
          <h2 className="font-semibold text-xl">₹{props.fare?.car ?? "-"}</h2>
        </div>

        {/* Bike */}
        <div
          onClick={() => {
            props.setConfirmRidePanel(true);
            props.setVehicleType("bike");
          }}
          className="flex items-center justify-between border-2 border-transparent hover:border-black bg-gray-100 rounded-xl p-3 cursor-pointer transition"
        >
          <img className="h-11 w-auto" src="/IMG/BikePng.png" alt="Bike" />
          <div className="w-1/2 px-2">
            <h4 className="font-medium text-base flex items-center gap-1">
              Moto <i className="ri-user-3-fill text-gray-600 text-sm"></i> 1
            </h4>
            <h5 className="font-medium text-sm">5 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, Motorcycle rides
            </p>
          </div>
          <h2 className="font-semibold text-xl">₹{props.fare?.bike ?? "-"}</h2>
        </div>

        {/* Auto */}
        <div
          onClick={() => {
            props.setConfirmRidePanel(true);
            props.setVehicleType("auto");
          }}
          className="flex items-center justify-between border-2 border-transparent hover:border-black bg-gray-100 rounded-xl p-3 cursor-pointer transition"
        >
          <img className="h-12 w-auto" src="/IMG/AutoPng.png" alt="Auto" />
          <div className="w-1/2 px-2">
            <h4 className="font-medium text-base flex items-center gap-1">
              Auto <i className="ri-user-3-fill text-gray-600 text-sm"></i> 3
            </h4>
            <h5 className="font-medium text-sm">6 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, Auto rides
            </p>
          </div>
          <h2 className="font-semibold text-xl">₹{props.fare?.auto ?? "-"}</h2>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
