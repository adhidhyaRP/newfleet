import React from 'react';
import './Cargo.css';

const Cargo = () => {
  const trucks = [
    {
      id: 1,
      status: 'Alert: Cargo Door Open!',
      location: '123 Main St, City',
      lastChecked: '10 minutes ago',
      alert: true,
    },
    {
      id: 2,
      status: 'All Secure',
      location: '456 Elm St, City',
      lastChecked: '5 minutes ago',
      alert: false,
    },
    {
      id: 3,
      status: 'Alert: Cargo Door Open!',
      location: '789 Oak St, City',
      lastChecked: '2 minutes ago',
      alert: true,
    },
  ];

  return (
    <div className="container">
      <h1 className="header">Cargo Security Monitoring</h1>
      <select className="select">
        <option>Select Truck</option>
        {trucks.map((truck) => (
          <option key={truck.id}>Truck #{truck.id}</option>
        ))}
      </select>
      {trucks.map((truck) => (
        <div
          key={truck.id}
          className={`truck-card ${truck.alert ? 'alert' : 'secure'}`}
        >
          <h2 className="truck-title">Truck #{truck.id} - Cargo Status</h2>
          <div className={`status ${truck.alert ? 'alert' : 'secure'}`}>
            {truck.status}
          </div>
          <p className="details">Location: {truck.location}</p>
          <p className="details">Last Checked: {truck.lastChecked}</p>
        </div>
      ))}
    </div>
  );
};

export default Cargo;
