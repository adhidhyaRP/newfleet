import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./TemperatureControl.css";
import './MaintenanceAlert.css'

function TemperatureControl() {
  const location = useLocation();
  const [setTemp, setSetTemp] = useState("");
  const [vehicle, setVehicle] = useState("Truck 1");

  // Access the complete currentData object
  const currentData = location.state?.currentData ?? {};

  // Maintenance data
  const maintenanceData = {
    upcomingMaintenance: [
      { task: "Oil Change", days: 5 },
      { task: "Tire Rotation", days: 10 },
      { task: "Brake Inspection", days: 15 },
    ],
    predictiveAnalytics: 75, // Probability percentage
  };

  const handleSetTemp = () => {
    alert(`Set temperature to ${setTemp}°C for Truck ID ${currentData.truck_id ?? 'N/A'}`);
  };

  return (
    <div className="temperature-control">
      <h2>Temperature Monitoring & Control</h2>

      <div className="truck-card active">
        <h3>Truck ID: {currentData.truck_id ?? 'N/A'}</h3>
        <p><strong>Temperature:</strong> {currentData.temperature ?? 'N/A'} °C</p>
        <p><strong>Default Temperature :</strong> 5 °C</p>
        <p><strong>Alert:</strong> {currentData.action}</p>
        {/* <p><strong>Fuel Level:</strong> {currentData.fuel_level ?? 'N/A'}%</p> */}

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

      {/* Maintenance Alert Section */}
      <div className="maintenance-alert">
        <div className="header">
          <h3>Maintenance Schedule</h3>
        </div>
        <div className="content">
          

          <div className="upcoming-maintenance">
            <h4>Upcoming Maintenance</h4>
            {maintenanceData.upcomingMaintenance.map((item, index) => (
              <p key={index}>
                <strong>{item.task}:</strong> {item.days} days
              </p>
            ))}
          </div>

          <div className="predictive-analytics">
            <h4>Predictive Analytics</h4>
            <p>
              Probability of Maintenance Required in Next 30 Days: 75%
              <span className="probability"> {currentData.maintenance_action}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemperatureControl;
