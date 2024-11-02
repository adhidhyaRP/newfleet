// Import necessary libraries and components
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Home from './Home';
import OwnerDashboard from './OwnerDashboard';
import MaintenanceAlert from './MaintenanceAlert';
import TemperatureControl from './TemperatureControl';
import Cargo from './Cargo';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    if (username && password) {
      console.log(`Logged in as ${userType}`);
      if (userType === 'Owner') {
        navigate('/owner-dashboard'); // Redirect to OwnerDashboard
      } else if (userType === 'Driver') {
        navigate('/home'); // Redirect to Home
      }
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Fleet IQ</h1>
        <h2>Welcome Back!</h2>
        <br />
        <p>Choose your login type below</p>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Enter your username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <div className="button-group">
            <button type="button" className="owner-button" onClick={() => handleLogin('Owner')}>
              Owner Login
            </button>
            <button type="button" className="driver-button" onClick={() => handleLogin('Driver')}>
              Driver Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/maintenance-alert" element={<MaintenanceAlert />} />
        <Route path="/temperature-control" element={<TemperatureControl />} />
        <Route path="/cargo" element={<Cargo />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
