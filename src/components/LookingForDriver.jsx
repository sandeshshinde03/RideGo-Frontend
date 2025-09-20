// frontend/src/components/LookingForDriver.jsx
import React from "react";

const LookingForDriver = (props) => {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Close arrow */}
      <div
        className="absolute top-[-30px] left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => props.setVehicleFound(false)}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-400 hover:text-black"></i>
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Looking for a driver
      </h3>

      <div className="flex flex-col items-center gap-4">
        {/* Vehicle Image */}
        <img className="h-20" src="/CarPng.png" alt="CarPNG" />

        <div className="w-full mt-4">
          {/* Pickup */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">567-12-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-line"></i>
            <div>
              <h3 className="text-lg font-medium">567-12-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                ₹{props.fare?.[props.vehicleType] ?? "-"}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
