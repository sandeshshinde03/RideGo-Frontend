import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to recenter map when position changes
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      // ✅ flyTo keeps current zoom instead of resetting
      map.flyTo([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);
  return null;
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error("Error getting location:", err),
      { enableHighAccuracy: true }
    );

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error("Error watching location:", err),
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!currentPosition) {
    return <p className="text-center mt-10">Fetching your location...</p>;
  }

  return (
    <MapContainer
      center={currentPosition}
      zoom={15}
      style={{ height: "100%", width: "100%", zIndex: 0 }} 
      scrollWheelZoom={true}
      zoomControl={true}
      doubleClickZoom={true}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=2m4NY1H3VIdjxUGwP3oC`}
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
      />
      <Marker position={currentPosition}>
        <Popup>You are here</Popup>
      </Marker>
      <RecenterMap position={currentPosition} />
    </MapContainer>
  );
};

export default LiveTracking;
