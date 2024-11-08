import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [dataArray, setDataArray] = useState([]); // Array to hold fetched data
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the currently displayed data
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Flag for data load state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://uidrnjy424.execute-api.eu-north-1.amazonaws.com/shivam4stage/fleetdata');
        setDataArray(response.data); // Assume response.data is an array of 29 data items
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isDataLoaded && dataArray.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dataArray.length); // Cycle through data
      }, 1000);

      return () => clearInterval(intervalId); // Clear interval on unmount
    }
  }, [isDataLoaded, dataArray.length]);

  const currentData = dataArray[currentIndex] || {}; // Current data item or empty object if data not loaded

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: 'white' }}>Fleet IQ</Link>
          <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/maintenance-alert">Maintenance Alert</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/temperature-control">Temperature Control</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cargo">Cargo Security</Link>
              </li>
            </ul>
            <button className="btn btn-outline-danger ms-auto" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <h1>Optimize Your Fleet with Smart Solutions</h1>
        <p>Real-time tracking, maintenance scheduling, and fuel efficiency monitoring.</p>
        <button className="get-started-button">Get Started</button>
      </section>

      <div className="owner-dashboard">
        <header className="dashboard-header">Owner's Dashboard</header>

        <div className="dashboard-section">
          <div className="card">
            <h2>Temperature Monitor</h2>
            <p>Current Temperature: <strong>{currentData.temperature ?? 'N/A'} °C</strong></p>
          </div>
          <div className="card">
            <h2>Humidity Monitor</h2>
            <p>Current Humidity: <strong>{currentData.humidity ?? 'N/A'} %</strong></p>
          </div>
          <div className="card">
            <h2>GPS Tracking</h2>
            <p>Latitude: <strong>{currentData.latitude ?? 'N/A'}</strong></p>
            <p>Longitude: <strong>{currentData.longitude ?? 'N/A'}</strong></p>
          </div>

          <div className="map-container">
            {isDataLoaded && currentData.latitude !== undefined && currentData.longitude !== undefined ? (
              <MapContainer 
                center={[currentData.latitude, currentData.longitude]} 
                zoom={13} 
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[currentData.latitude, currentData.longitude]}>
                  <Popup>
                    Location: ({currentData.latitude}, {currentData.longitude})
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p>Loading map...</p>
            )}
          </div>

          <div className="card">
            <h2>Driver's Front Camera</h2>
            <img 
              src="https://via.placeholder.com/300x150" 
              alt="Driver's Front Camera"
              className="driver-camera-image"
            />
          </div>
        </div>
      </div>

      <section className="features-section" id="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-Time Tracking</h3>
            <p>Monitor your fleet’s location and status in real-time to ensure efficiency.</p>
          </div>
          <div className="feature-card">
            <h3>Maintenance Scheduling</h3>
            <p>Keep your trucks running smoothly with predictive maintenance alerts.</p>
          </div>
          <div className="feature-card">
            <h3>Temperature Monitoring</h3>
            <p>Track and control cargo temperature.</p>
          </div>
          <div className="feature-card">
            <h3>Driver Behavior Monitoring</h3>
            <p>Monitor the driver's behavior.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OwnerDashboard;
