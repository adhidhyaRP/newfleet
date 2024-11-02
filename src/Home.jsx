import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleLogout = ()=>{
    navigate("/")
  }

  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: 'white' }}>Fleet IQ</Link>
          <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/home" style={{ color: 'white' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/maintenance-alert" style={{ color: 'white' }}>MaintenanceAlert</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/temperature-control" style={{ color: 'white' }}>TemperatureControl</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/cargo" style={{ color: 'white' }}>CargoSecurity</Link>
              </li>
            </ul>
            <button className="btn btn-outline-danger ms-auto" to="/" onClick={handleLogout} type="button">Logout</button>
          </div>
        </div>
      </nav>
      
      <section className="hero-section">
        <h1>Optimize Your Fleet with Smart Solutions</h1>
        <p>Real-time tracking, maintenance scheduling, and fuel efficiency monitoring.</p>
        <button className="get-started-button">Get Started</button>
      </section>

      <div className="dashboard">
        <header className="dashboard-header">Driver Dashboard</header>
        <div className="info-cards">
          <div className="card temperature">
            <h2>Temperature Monitor</h2>
            <div className="temperature-value">72°F</div>
            <p>Current Interior Temperature</p>
          </div>
          <div className="card navigation">
            <h2>Navigation</h2>
            <p>Current Location: <strong>Main St & 5th Ave</strong></p>
            <p>Destination: <strong>123 Elm Street</strong></p>
            <button className="start-navigation">Start Navigation</button>
          </div>
        </div>
        
        <MapContainer center={[8.5241, 76.9366]} zoom={13} style={{ height: '300px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
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
            <p>Track and control cargo temperature</p>
          </div>
          <div className="feature-card">
            <h3>Driver Behavior Monitoring</h3>
            <p>Monitor the driver's behavior</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
