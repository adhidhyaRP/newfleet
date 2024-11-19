import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './Home.css';
import "./OwnerDashboard.css";
import Modal from './Modal';
import { FaBars } from 'react-icons/fa'; // Install react-icons if not already installed

// Define the truck icon (round with a truck image)
const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.freepik.com/512/3515/3515353.png', 
  iconSize: [38, 38], 
  iconAnchor: [19, 19], 
  popupAnchor: [0, -15],
});

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
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
    navigate('/');
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
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">FLEET IQ</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
        <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>
       
       
      </ul>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <section className="hero-section">
        <h1>Optimize Your Fleet with Smart Solutions</h1>
        <p>Real-time tracking, maintenance scheduling, and fuel efficiency monitoring.</p>
       
      </section>

      {/* GPS Location Dashboard */}
      <div className='assets'>
          <h2>ASSETS</h2>
      </div>

      {/* Map Container */}
      {isDataLoaded && (
        <MapContainer
          center={[19.567,72.778]}  // Default center if no truck is selected
          zoom={5}  // Zoom out to view all trucks
          style={{ height: '450px', width: '100%' }}
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
