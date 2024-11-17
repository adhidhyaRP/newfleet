import React from 'react';
import { useLocation } from 'react-router-dom';
import './Dashcam.css';

function Dashcam() {
  const location = useLocation();
  const currentData = location.state?.currentData;

  return (
    <div className="dashcam-container">
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
