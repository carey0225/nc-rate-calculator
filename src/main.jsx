import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactGA from 'react-ga4';
import './index.css';

// Initialize Google Analytics 4 with your Measurement ID
const MEASUREMENT_ID = "G-N8F8BMCNMG";
ReactGA.initialize(MEASUREMENT_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);