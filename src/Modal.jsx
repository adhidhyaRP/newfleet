
import React from 'react';
import './Modal.css';
import { useNavigate } from 'react-router-dom';

const Modal = ({ show, onClose, currentData }) => {
  if (!show) return null;
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>

        <h2>Truck Details</h2>
        <div className="truck-image-container">
          <img src="https://shots.codepen.io/username/pen/MWeeWpE-800.jpg?version=1603006809" alt="Truck" className="truck-image" />
        </div>

        <h3>Temperature Monitor</h3>
        <div className="temperature-value">{currentData.temperature ?? 'N/A'} °C</div>
        <p>Current Temperature</p>

        <h3 className="detailsmodal">Truck Driver: Ramesh kumar</h3>
        <h3 className="detailsmodal">Destination: Vizag,Andhra Pradesh</h3>
        <h3 className="detailsmodal">Goods Type:        Food</h3>

        {/* Pass currentData to TemperatureControl */}
        <button
          className="view-truck-button"
          onClick={() => navigate('/temperature-control', { state: { currentData } })}
        >
          View Truck
        </button>
      </div>
    </div>
  );
};

export default Modal;// TemperatureControl.js
