import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="/DriverIMG.jpg"
            alt="Driver IMG"
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h4>
        </div>

        {/* Earnings */}
        <div className="text-right">
          <h4 className="text-xl font-semibold">₹295.40</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex p-3 bg-gray-50 rounded-xl justify-center gap-5 items-start mt-8">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">52</h5>
          <p className="text-sm text-gray-600">Trips Completed</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">3</h5>
          <p className="text-sm text-gray-600">Cancelled</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
