import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import axios from "axios";
import './TemperatureControl.css';
import './MaintenanceAlert.css';
import 'leaflet/dist/leaflet.css';

const targetLocation = { lat: 17.6868, lng: 83.2185 }; // Vizag
const apiKey = '5b3ce3597851110001cf624836f399a8acab4bd8ad7e4264e343dba3'; // Replace with your API key

function TemperatureControl() {
  const location = useLocation();
  const [setTemp, setSetTemp] = useState(""); // State for setting temperature
  const [route, setRoute] = useState(null);    // State for storing route data
  const currentData = location.state?.currentData ?? {}; // Get currentData from location state

  // Define currentLocation based on truck's location data in `currentData`
  const currentLocation = {
    lat: currentData.latitude ?? 19.0760, // Default latitude if none is provided
    lng: currentData.longitude ?? 72.8777, // Default longitude if none is provided
  };

  // Function to handle temperature setting action
  const handleSetTemp = () => {
    alert(`Set temperature to ${setTemp}°C for Truck ID ${currentData.truck_id ?? 'N/A'}`);
  };

  // Fetch the route from current location to target location
  useEffect(() => {
    // console.log(currentLocation.lat)
    if (currentData.latitude && currentData.longitude) {
      // if (currentLocation.lat && currentLocation.lng) {
      const fetchRoute = async () => {
        try {
          const response = await axios.post(
            `https://api.openrouteservice.org/v2/directions/driving-car`,
            {
              coordinates: [
                [currentLocation.lng, currentLocation.lat], // Starting point (current location)
                [targetLocation.lng, targetLocation.lat]    // Destination (Vizag)
              ]
            },
            {
              headers: {
                Authorization: apiKey,
                "Content-Type": "application/json"
              }
            }
          );
          setRoute(response.data); // Store route data in state
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching route:", error); // Log errors for debugging
        }
      };
      fetchRoute();
    }
  }, [currentData]); // Refetch route when `currentData` changes

  return (
    <div className="temperature-control-container">
      <div className="map-container">
        <h2>Truck Route</h2>
        <MapContainer center={currentLocation} zoom={6} style={{ width: '100%', height: '700px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Marker for current location */}
          <Marker position={currentLocation}>
            <Popup>Current Location (Truck)</Popup>
          </Marker>
          {/* Marker for target location */}
          <Marker position={targetLocation}>
            <Popup>Destination (Vizag)</Popup>
          </Marker>
          {/* Route Polyline if route data is available */}
          {route && route.features && (
            <Polyline
              positions={route.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng])}
              color="blue"
              weight={5}
              opacity={0.7}
            />
          )}
        </MapContainer>
      </div>

      {/* Temperature Monitoring & Control Section */}
      <div className="temperature-monitoring">
        <h2>Temperature Monitoring & Control</h2>
        <div className="truck-card">
          <h3>Truck ID: {currentData.truck_id ?? 'N/A'}</h3>
          <p><strong>Current Temperature:</strong> {currentData.temperature ?? 'N/A'} °C</p>
          <p><strong>Default Temperature Range:</strong> 10-15°C</p>
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

      {/* Maintenance Schedule and Predictive Analytics Section */}
      <div className="maintenance-alert">
        <h3>Maintenance Schedule</h3>
        <div className="upcoming-maintenance">
          <h4>Upcoming Maintenance</h4>
          <p>Oil Change: 5 days</p>
          <p>Tire Rotation: 10 days</p>
        </div>
        <div className="predictive-analytics">
          <h4>Predictive Analytics</h4>
          <p>Probability of Maintenance: 75%</p>
        </div>
      </div>
    </div>
  );
}

export default TemperatureControl;
