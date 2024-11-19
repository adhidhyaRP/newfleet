import React, { useState, useEffect } from 'react';
import './Modal.css';
import { useNavigate } from 'react-router-dom';

const Modal = ({ show, onClose, currentData }) => {
  if (!show) return null;
  const navigate = useNavigate();

  const [location, setLocation] = useState('Fetching location...');

  // Hardcoded details for each truck ID
  const truckDetails = {
    1: {
      destination: 'Kohinoor Mill Compound, Lower Parel, Mumbai, Maharashtra 400013, India',
      driverId: 'D001',
      driverName: 'Ramesh Kumar',
      truckType: '18-Wheeler',
      goodsType: 'Perishable Food Items',
      cargoWeight: '15,000 kg',
      capacity: '20,000 kg',
    },
    2: {
      destination: 'M Block, Connaught Place, Delhi 110001, India',
      driverId: 'D002',
      driverName: 'Suresh Gupta',
      truckType: 'Flatbed Truck',
      goodsType: 'Consumer Electronics',
      cargoWeight: '10,500 kg',
      capacity: '15,000 kg',
    },
    3: {
      destination: 'Salt Lake Sector V, Bidhannagar, Kolkata, West Bengal 700091, India',
      driverId: 'D003',
      driverName: 'Amit Roy',
      truckType: 'Refrigerated Truck',
      goodsType: 'Textiles and Garments',
      cargoWeight: '9,000 kg',
      capacity: '12,000 kg',
    },
    4: {
      destination: 'Guindy Industrial Area, Guindy, Chennai, Tamil Nadu 600032, India',
      driverId: 'D004',
      driverName: 'Vikram Iyer',
      truckType: 'Tanker Truck',
      goodsType: 'Chemicals and Pharmaceuticals',
      cargoWeight: '20,000 kg',
      capacity: '25,000 kg',
    },
    5: {
      destination: 'Electronic City Phase 1, Hosur Road, Bangalore, Karnataka 560100, India',
      driverId: 'D005',
      driverName: 'Manoj Singh',
      truckType: 'Box Truck',
      goodsType: 'Office Furniture',
      cargoWeight: '7,500 kg',
      capacity: '10,000 kg',
    },
  };

  const latitude = currentData?.latitude;
  const longitude = currentData?.longitude;
  const truckId = currentData?.truck_id;

  const {
    destination = 'Unknown Destination',
    driverId = 'Unknown Driver ID',
    driverName = 'Unknown Driver Name',
    truckType = 'Unknown Truck Type',
    goodsType = 'Unknown Goods Type',
    cargoWeight = 'Unknown Weight',
    capacity = 'Unknown Capacity',
  } = truckDetails[truckId] || {};

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
      console.error('Error fetching location:', error);
      setLocation('Error fetching location');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>

        <div className="truck-image-container">
          <img
            src="https://shots.codepen.io/username/pen/MWeeWpE-800.jpg?version=1603006809"
            alt="Truck"
            className="truck-image"
          />
        </div>

        <div className="truck-details">
        <span className="detailsmodal">
            Current Temperature: {currentData.temperature ?? 'N/A'} °C
          </span>
          <h3 className="detailsmodal">Driver ID: {driverId}</h3>
          <h3 className="detailsmodal">Truck Driver: {driverName}</h3>
          <h3 className="detailsmodal">Truck Type: {truckType}</h3>
          <h3 className="detailsmodal">Goods Type: {goodsType}</h3>
          <h3 className="detailsmodal">Cargo Weight: {cargoWeight}</h3>
          
          <h3 className="detailsmodal">Destination: {destination}</h3>
          <h3 className="detailsmodal">Current Location: {location}</h3>
         
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
