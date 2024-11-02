import React, { useState } from "react";
import "./TemperatureControl.css";

function TemperatureControl() {
  const [selectedTruck, setSelectedTruck] = useState("Truck #1");
  const [setTemp, setSetTemp] = useState("");

  const trucksData = [
    {
      id: "Truck #1",
      temperature: "22°C",
      co2Level: "400 ppm",
    },
    {
      id: "Truck #2",
      temperature: "19°C",
      co2Level: "420 ppm",
    },
  ];

  const handleSetTemp = () => {
    alert(`Set temperature to ${setTemp}°C for ${selectedTruck}`);
  };

  return (
    <div className="temperature-control">
      <h2>Temperature Monitoring & Control</h2>
      <select
        className="truck-select"
        value={selectedTruck}
        onChange={(e) => setSelectedTruck(e.target.value)}
      >
        {trucksData.map((truck) => (
          <option key={truck.id} value={truck.id}>
            {truck.id}
          </option>
        ))}
      </select>

      {trucksData.map((truck) => (
        <div key={truck.id} className={`truck-card ${truck.id === selectedTruck ? "active" : ""}`}>
          <h3>{truck.id}</h3>
          <p><strong>Temperature:</strong> <span className="temperature">{truck.temperature}</span></p>
          <p><strong>CO2 Level:</strong> <span className="co2-level">{truck.co2Level}</span></p>
          
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
      ))}
    </div>
  );
}

export default TemperatureControl;
