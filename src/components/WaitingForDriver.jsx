import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      {/* Close arrow */}
      <div
        className="absolute top-[-1px] left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() =>
           props.setWaitingForDriver(false)}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-400 hover:text-black"></i>
      </div>

      <div className="flex items-center justify-between">
        <img className="h-12" src="\IMG\CarPng.png" alt="CarPNG" />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">{props.ride?.captain?.fullname?.firstname}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain?.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">Vehicle Color: {props.ride?.captain?.vehicle.color}</p>
          <h1 className="text-lg font-semibold">{props.ride?.otp}</h1>
        </div>
      </div>

      <div className="flex justify-between gap-2 flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex item-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">567-12-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex item-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-line"></i>
            <div>
              <h3 className="text-lg font-medium">567-12-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex item-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
