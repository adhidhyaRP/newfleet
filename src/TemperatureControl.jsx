import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./TemperatureControl.css";
import "./MaintenanceAlert.css";

// Custom marker icon using URL
const customMarkerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const targetLocation = { lat: 16.6868, lng: 82.2185 }; // Vizag

function TemperatureControl() {
  const location = useLocation();
  const navigate = useNavigate();
  const [setTemp, setSetTemp] = useState("");
  const currentData = location.state?.currentData ?? {};

  const currentLocation = {
    lat: currentData.latitude ?? 19.0760, // Default to Mumbai if no data is provided
    lng: currentData.longitude ?? 72.8777,
  };

  const handleSetTemp = () => {
    alert(`Set temperature to ${setTemp}°C for Truck ID ${currentData.truck_id ?? "N/A"}`);
  };

  return (
    <div className="temperature-control-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>

      {/* Map Section */}
      <div className="map-container">
        <h2>Truck Route</h2>
        <MapContainer center={currentLocation} zoom={6} style={{ width: "100%", height: "700px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Marker for Current Location */}
          <Marker position={currentLocation} icon={customMarkerIcon}>
            <Popup>Current Location (Truck)</Popup>
          </Marker>

          {/* Marker for Target Location */}
          <Marker position={targetLocation} icon={customMarkerIcon}>
            <Popup>Destination (Vizag)</Popup>
          </Marker>

          {/* Straight Line between Current Location and Target Location */}
          <Polyline
            positions={[
              [currentLocation.lat, currentLocation.lng], // Starting point
              [targetLocation.lat, targetLocation.lng], // Destination
            ]}
            color="blue"
            weight={5}
            opacity={0.7}
          />
        </MapContainer>
      </div>

      {/* Temperature Monitoring Section */}
      <div className="temperature-monitoring">
        <h2>Temperature Monitoring & Control</h2>
        <div className="truck-card">
          <h3>Truck ID: {currentData.truck_id ?? "N/A"}</h3>
          <p><strong>Current Temperature:</strong> {currentData.temperature ?? "N/A"} °C</p>
          <p><strong>Default Temperature Range:</strong> 10-15°C</p>
          <p><strong>Alert:</strong> {currentData.action ?? "No alerts"}</p>
          <div className="set-temp">
            <input
              type="number"
              placeholder="°C"
              value={setTemp}
              onChange={(e) => setSetTemp(e.target.value)}
            />
            <button onClick={handleSetTemp}>Set</button>
          </div>
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="maintenance-alert">
        <h3>Maintenance Schedule</h3>
        <div className="upcoming-maintenance">
          <h4>Upcoming Maintenance</h4>
          <p>Oil Change: 5 days</p>
          <p>Tire Rotation: 10 days</p>
        </div>
        <div className="predictive-analytics">
          <h4>Predictive Analytics</h4>
          <p><strong>Probability of Maintenance:</strong> 75%</p>
          <p><strong>Action:</strong> {currentData.maintenance_action ?? "No actions required"}</p>
        </div>
      </div>
    </div>
  );
}

export default TemperatureControl;