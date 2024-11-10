
import React, { useState } from "react";
import "./MaintenanceAlert.css";

function MaintenanceAlert() {
  const [vehicle, setVehicle] = useState("Truck 3");

  const maintenanceData = {
    upcomingMaintenance: [
      { task: "Oil Change", days: 5 },
      { task: "Tire Rotation", days: 10 },
      { task: "Brake Inspection", days: 15 },
    ],
    predictiveAnalytics: 75, // Probability percentage
  };

  return (
    <div className="maintenance-alert">
      <div className="header">
        <h3>Maintenance Schedule</h3>
      </div>
      <div className="content">
        <select
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="vehicle-select"
        >
          <option>Truck 1</option>
          <option>Truck 2</option>
          <option>Truck 3</option>
        </select>

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
            Probability of Maintenance Required in Next 30 Days:
            <span className="probability"> {maintenanceData.predictiveAnalytics}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceAlert;
