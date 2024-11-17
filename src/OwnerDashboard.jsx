import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './Home.css';
import "./OwnerDashboard.css";
import Modal from './Modal';

// Define the truck icon (round with a truck image)
const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.freepik.com/512/3515/3515353.png', 
  iconSize: [38, 38], 
  iconAnchor: [19, 19], 
  popupAnchor: [0, -15],
});

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTruckData, setSelectedTruckData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://uidrnjy424.execute-api.eu-north-1.amazonaws.com/newstage/fleetdata');
        setCurrentData(response.data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial data fetch
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleMarkerClick = (truckId) => {
    const truckData = currentData[truckId];
    setSelectedTruckData(truckData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: 'white' }}>Fleet IQ</Link>
          <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <button className="btn btn-outline-danger ms-auto" onClick={handleLogout}>Logout</button>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Optimize Your Fleet with Smart Solutions</h1>
        <p>Real-time tracking, maintenance scheduling, and fuel efficiency monitoring.</p>
        <button className="get-started-button">Get Started</button>
      </section>

      {/* GPS Location Dashboard */}
      <div className="dashboard">
        <header className="dashboard-header">Dashboard</header>
      </div>

      {/* Map Container */}
      {isDataLoaded && (
        <MapContainer
          center={[19.567,72.778]}  // Default center if no truck is selected
          zoom={5.5}  // Zoom out to view all trucks
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* Display markers for all trucks */}
          {Object.keys(currentData).map((truckId) => {
            const truck = currentData[truckId];
            if (truck.latitude && truck.longitude) {
              return (
                <Marker
                  key={truckId}
                  position={[truck.latitude, truck.longitude]}
                  icon={truckIcon}
                  eventHandlers={{
                    dblclick: () => handleMarkerClick(truckId),  // Double-click to show modal
                  }}
                >
                  {/* Display truck ID above the marker */}
                  <Popup>{truckId}</Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      )}

      {/* Modal for Truck Data */}
      <Modal show={showModal} onClose={handleCloseModal} currentData={selectedTruckData} />

      {/* Features Section */}
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
