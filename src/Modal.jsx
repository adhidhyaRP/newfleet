import React, { useState, useEffect } from 'react';
import './Modal.css';
import { useNavigate } from 'react-router-dom';

const Modal = ({ show, onClose, currentData }) => {
  if (!show) return null;
  const navigate = useNavigate();

  const [location, setLocation] = useState('Fetching location...');

  // Hardcoded destinations for each truck ID
  const destinations = {
    1: 'Mumbai, Maharashtra',
    2: 'Delhi, Delhi',
    3: 'Kolkata, West Bengal',
    4: 'Chennai, Tamil Nadu',
    5: 'Bangalore, Karnataka',
  };

  const latitude = currentData?.latitude;
  const longitude = currentData?.longitude;
  const truckId = currentData?.truck_id;
  const destination = destinations[truckId] || 'Unknown Destination';

  useEffect(() => {
    if (latitude && longitude) {
      fetchLocationFromCoordinates(latitude, longitude);
    }
  }, [latitude, longitude]);

  // Function to call Nominatim API for reverse geocoding
  const fetchLocationFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();

      if (data && data.display_name) {
        setLocation(data.display_name);
      } else {
        setLocation('Location not found');
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocation('Error fetching location');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>

        <div className="truck-image-container">
          <img
            src="https://shots.codepen.io/username/pen/MWeeWpE-800.jpg?version=1603006809"
            alt="Truck"
            className="truck-image"
          />
        </div>

        <div className="truck-details">
          <h3 className="detailsmodal">Truck Driver: Ramesh Kumar</h3>
          <h3 className="detailsmodal">Destination: {destination}</h3>
          <h3 className="detailsmodal">Current Location: {location}</h3>
          <span className="detailsmodal">
            Current Temperature: {currentData.temperature ?? 'N/A'} °C
          </span>
          <h3 className="detailsmodal">Goods Type: Food</h3>
        </div>

        <button
          className="view-truck-button"
          onClick={() => navigate('/temperature-control', { state: { currentData } })}
        >
          View Truck
        </button>
        <button
          className="dashcam-button"
          onClick={() => navigate('/dashcam', { state: { currentData } })}
        >
          Dashcam
        </button>
      </div>
    </div>
  );
};

export default Modal;
