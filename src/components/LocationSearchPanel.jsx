import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationSearchPanel = ({
  query,
  setPickup,
  setDestination,
  focusedField,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem("token");

        const baseUrl = import.meta.env.VITE_BASE_URL;

        const res = await axios.get(
          `${baseUrl}/maps/get-suggestions?input=${query}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSuggestions(
          Array.isArray(res.data.suggestions) ? res.data.suggestions : []
        );
      } catch (err) {
        console.error("Error fetching suggestions", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSelect = (location) => {
    if (focusedField === "pickup") {
      setPickup(location.name);
    } else {
      setDestination(location.name);
    }
  };

  return (
    <div>
      {suggestions.length === 0 && query ? (
        <p className="text-gray-500 text-center mt-3">No results found</p>
      ) : (
        suggestions.map((loc, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(loc)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{loc.name}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default LocationSearchPanel;
