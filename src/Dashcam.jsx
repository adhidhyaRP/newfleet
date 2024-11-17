import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashcam.css';

function Dashcam() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const currentData = location.state?.currentData;

  return (
    <div className="dashcam-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h1>Dashcam View</h1>
      {currentData?.pictures?.[0] ? (
        <div className="dashcam-image-container">
          <img
            src={currentData.pictures[0]}
            alt="Truck Dashcam View"
            className="dashcam-image"
          />
        </div>
      ) : (
        <p>No picture available for this truck.</p>
      )}
    </div>
  );
}

export default Dashcam;
