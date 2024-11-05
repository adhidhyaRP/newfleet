import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [dataArray, setDataArray] = useState([]); // Store the array of data
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index in the array
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track data loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get('https://uidrnjy424.execute-api.eu-north-1.amazonaws.com/shivam4stage/fleetdata');
        console.log('API Response:', responseData.data); // Log response for debugging
        setDataArray(responseData.data); // Assume responseData.data is an array of data items
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Update the index every second to cycle through data
  useEffect(() => {
    if (isDataLoaded) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dataArray.length); // Loop back to the start after the last item
      }, 1000);

      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }
  }, [isDataLoaded, dataArray.length]);

  const currentData = dataArray[currentIndex] || {}; // Get the current data item, or an empty object if data isn't loaded

  const handleLogout = () => {
    navigate("/");
  };

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
                <Link className="nav-link active" to="/maintenance-alert" style={{ color: 'white' }}>Maintenance Alert</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/temperature-control" style={{ color: 'white' }}>Temperature Control</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/cargo" style={{ color: 'white' }}>Cargo Security</Link>
              </li>
            </ul>
            <button className="btn btn-outline-danger ms-auto" onClick={handleLogout} type="button">Logout</button>
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
            <div className="temperature-value">{currentData.temperature ?? 'N/A'} °C</div>
            <p>Current Temperature</p>
          </div>
          <div className="card humidity">
            <h2>Humidity Monitor</h2>
            <div className="humidity-value">{currentData.humidity ?? 'N/A'} %</div>
            <p>Current Humidity</p>
          </div>
          <div className="card navigation">
            <h2>GPS Location</h2>
            <p>Latitude: <strong>{currentData.latitude ?? 'N/A'}</strong></p>
            <p>Longitude: <strong>{currentData.longitude ?? 'N/A'}</strong></p>
          </div>
        </div>
      </div>

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
        <p>Loading map...</p> // Placeholder text while waiting for coordinates
      )}

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
};

export default Home;
