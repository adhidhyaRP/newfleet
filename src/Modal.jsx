/* Overlay for the modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Main content area of the modal */
.modal-content {
  background-color: white;
  width: 90%;
  max-width: 600px;
  max-height: 80vh; /* Limit the maximum height of the popup */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
}

/* Close button style */
.close-button {
  position: absolute;
  color: black;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

/* Container for the truck image */
.truck-image-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Style for the truck image */
.truck-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Styling for truck details section */
.truck-details {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns for alignment */
  gap: 10px;
  text-align: left; /* Align text to the left for clarity */
  width: 100%;
  margin-top: 20px;
}

.truck-details h3,
.truck-details span {
  font-size: 1rem;
  color: #333;
  margin: 0;
}

.detailsmodal {
  font-weight: bold;
  color: rgb(5, 65, 42);
}

.temperature-value {
  color: #0288d1; /* Blue for temperature */
  font-weight: bold;
  font-size: 1.2em;
}

/* Title for truck details section */
.modal-content h2 {
  color: #db4343;
  font-size: 1.6em;
  margin-bottom: 15px;
  font-weight: bold;
}

/* Button styles */
.view-truck-button,
.dashcam-button {
  margin-top: 15px;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-truck-button {
  background-color: #007bff; /* Blue */
  color: #fff;
}

.view-truck-button:hover {
  background-color: #0056b3;
}

.dashcam-button {
  background-color: #28a745; /* Green */
  color: #fff;
}

.dashcam-button:hover {
  background-color: #218838;
}

/* Responsive Design */
@media (max-width: 600px) {
  .modal-content {
    padding: 15px;
  }

  .truck-details {
    grid-template-columns: 1fr; /* Single column on small screens */
    text-align: center; /* Center-align for small screens */
  }

  .view-truck-button,
  .dashcam-button {
    font-size: 14px;
    padding: 10px 16px;
  }

  h2 {
    font-size: 1.4em;
  }
}
