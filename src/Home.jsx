
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './Home.css';
import "./OwnerDashboard.css";
import Modal from './Modal';

// Define the truck icon
const truckIcon = new L.Icon({
  iconUrl: 'https://tse3.mm.bing.net/th/id/OIP.rnirpSrcti5UQLGDAWHLygHaHa?rs=1&pid=ImgDetMain',
  iconSize: [38, 38],
  iconAnchor: [22, 22],
  popupAnchor: [0, -15],
});

const Home = () => {
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState("truck_1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/trucks');
        setCurrentData(response.data.body.trucks);
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

  const handleMarkerClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTruckSelection = (event) => {
    setSelectedTruck(event.target.value);
  };

  const selectedTruckData = currentData[selectedTruck];

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

      {/* Truck Selection Dropdown */}


      {/* Hero Section */}
      <section className="hero-section">
        <h1>Optimize Your Fleet with Smart Solutions</h1>
        <p>Real-time tracking, maintenance scheduling, and fuel efficiency monitoring.</p>
        <button className="get-started-button">Get Started</button>
      </section>

      {/* GPS Location Dashboard */}
      <div className="dashboard">
      <header className="dashboard-header">Dashboard</header>
      {/* <div className="truck-selection">
        <label htmlFor="truckSelect">Select Truck:</label>
        <select id="truckSelect" value={selectedTruck} onChange={handleTruckSelection}>
          <option value="truck_1">Truck 1</option>
          <option value="truck_2">Truck 2</option>
        </select>
      </div> */}
      <div className="card navigation">
          <h2 className='dashboard-header'>Select Truck</h2>
          <select id="truckSelect" value={selectedTruck} onChange={handleTruckSelection}>
          <option value="truck_1">Truck 1</option>
          <option value="truck_2">Truck 2</option>
        </select> </div>


        <div className="card navigation">
          <h2 >GPS Location</h2>
          <p>{selectedTruck} - Latitude: <strong>{selectedTruckData?.latitude ?? 'N/A'}</strong></p>
          <p>{selectedTruck} - Longitude: <strong>{selectedTruckData?.longitude ?? 'N/A'}</strong></p>
        </div>
      </div>

      {/* Map Container */}
      {isDataLoaded && selectedTruckData?.latitude !== undefined && selectedTruckData?.longitude !== undefined ? (
        <MapContainer
          center={[selectedTruckData.latitude, selectedTruckData.longitude]}
          zoom={2}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker
            position={[selectedTruckData.latitude, selectedTruckData.longitude]}
            icon={truckIcon}
            eventHandlers={{ click: handleMarkerClick }}
          />
        </MapContainer>
      ) : (
        <p>Loading map...</p>
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

export default Home;
