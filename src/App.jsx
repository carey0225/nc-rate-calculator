import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; 
import DeepDive from './DeepDive';
import TableauPage from './TableauPage';
import './App.css';

const Home = () => {
  const [kwh, setKwh] = useState(1000); 
  const [rateType, setRateType] = useState('standard');

  const rateSchedules = {
    standard: {
      label: "Standard Residential (RES)",
      description: "The most common flat-rate plan for NC residential customers.",
      rates: {
        current: { customer: 14.00, energy: 0.12623, storm: 0.00210, rider: 0.01949, clean: 1.52 },
        proposed: { customer: 15.75, energy: 0.14420, storm: 0.00280, rider: 0.02410, clean: 1.95 }
      }
    },
    tou: {
      label: "Smart Usage (R-TOU)",
      description: "Time-of-Use plan with higher peak and lower off-peak rates.",
      rates: {
        current: { customer: 14.00, energy: 0.11850, storm: 0.00210, rider: 0.01949, clean: 1.52 },
        proposed: { customer: 16.50, energy: 0.13920, storm: 0.00280, rider: 0.02410, clean: 1.95 }
      }
    },
    flex: {
      label: "Flex Savings (Pilot)",
      description: "Designed for EV owners or those who can shift heavy usage to overnight hours.",
      rates: {
        current: { customer: 14.00, energy: 0.10240, storm: 0.00210, rider: 0.01949, clean: 1.52 },
        proposed: { customer: 18.50, energy: 0.12110, storm: 0.00280, rider: 0.02410, clean: 1.95 }
      }
    }
  };

  const selectedRate = rateSchedules[rateType];

  const calculateBill = (r) => {
    const energyCharge = kwh * r.energy;
    const stormCharge = kwh * r.storm;
    const riderCharge = kwh * r.rider;
    const subtotal = r.customer + energyCharge + stormCharge + riderCharge + r.clean;
    const tax = subtotal * 0.07; 
    return {
      customer: r.customer,
      energy: energyCharge,
      storm: stormCharge,
      rider: riderCharge,
      clean: r.clean,
      tax: tax,
      total: subtotal + tax
    };
  };

  const cur = calculateBill(selectedRate.rates.current);
  const prop = calculateBill(selectedRate.rates.proposed);

  return (
    <div className="bill-page-bg">
      <div className="official-bill-container">
        <Navbar />

        <div className="bill-title-bar" style={{ marginTop: '20px' }}>
          <h2>NC Residential Rate Impact Tool</h2>
        </div>

        <section className="impact-narrative-section" style={{ padding: '20px 20px 10px', textAlign: 'left' }}>
          <h3 style={{ color: '#00598c', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            Understanding the 2024-2026 Rate Hike
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#333' }}>
            Duke Energy Progress is shifting toward <strong>Multi-Year Rate Plans</strong>. These hikes fund grid modernization 
            and carbon plan compliance, but the impact varies significantly based on which rate schedule you choose.
          </p>
        </section>

        {/* 2. RATE SCHEDULE TOGGLE - NOW CENTERED */}
<section className="rate-toggle-section" style={{ padding: '0 20px 20px', textAlign: 'center' }}>
  <p style={{ fontWeight: 'bold', color: '#00598c', marginBottom: '15px' }}>Select Your Rate Schedule:</p>
  <div style={{ 
    display: 'flex', 
    gap: '10px', 
    flexWrap: 'wrap', 
    justifyContent: 'center' // This centers the buttons
  }}>
    {Object.keys(rateSchedules).map((key) => (
      <button
        key={key}
        onClick={() => setRateType(key)}
        style={{
          padding: '10px 18px',
          borderRadius: '20px',
          border: rateType === key ? 'none' : '1px solid #00598c',
          backgroundColor: rateType === key ? '#00598c' : 'white',
          color: rateType === key ? 'white' : '#00598c',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '0.85rem',
          boxShadow: rateType === key ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
          transition: 'all 0.2s ease'
        }}
      >
        {rateSchedules[key].label}
      </button>
    ))}
  </div>
  <p style={{ 
    fontSize: '0.85rem', 
    fontStyle: 'italic', 
    marginTop: '15px', 
    color: '#666',
    maxWidth: '600px',
    margin: '15px auto 0' // Centers the description text block
  }}>
    {selectedRate.description}
  </p>
</section>

        <section className="usage-control-section" style={{ padding: '10px 20px 20px', backgroundColor: '#f9f9f9', borderRadius: '8px', margin: '0 20px 20px' }}>
          <p className="instruction-text" style={{ fontWeight: 'bold', color: '#00598c', marginBottom: '15px' }}>
            Move the slider to see how your monthly electricity bill may be impacted.
          </p>
          <div className="usage-focus">
            <span className="label">Monthly Energy Usage</span>
            <span className="value">{kwh} kWh</span>
          </div>
          <input 
            type="range" min="100" max="5000" step="10"
            value={kwh} onChange={(e) => setKwh(parseInt(e.target.value))}
            className="bill-slider"
          />
          <div className="slider-bounds">
            <span>100 kWh</span>
            <span>5,000 kWh</span>
          </div>
        </section>

        <div className="billing-details-wrapper">
          <table className="official-data-table">
            <thead>
              <tr className="blue-section-header">
                <th colSpan="5">Billing details - {selectedRate.label}</th>
              </tr>
              <tr className="sub-header-row">
                <th align="left">Description</th>
                <th>Current Rate</th>
                <th>Current Amount</th>
                <th>Proposed Rate</th>
                <th>Proposed Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic Customer Charge</td>
                <td>Fixed</td>
                <td>${cur.customer.toFixed(2)}</td>
                <td>Fixed</td>
                <td>${prop.customer.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Energy Charge</td>
                <td>@{selectedRate.rates.current.energy}</td>
                <td>${cur.energy.toFixed(2)}</td>
                <td>@{selectedRate.rates.proposed.energy}</td>
                <td>${prop.energy.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Storm Recovery Charge</td>
                <td>@{selectedRate.rates.current.storm}</td>
                <td>${cur.storm.toFixed(2)}</td>
                <td>@{selectedRate.rates.proposed.storm}</td>
                <td>${prop.storm.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Summary of Rider Adjustments</td>
                <td>@{selectedRate.rates.current.rider}</td>
                <td>${cur.rider.toFixed(2)}</td>
                <td>@{selectedRate.rates.proposed.rider}</td>
                <td>${prop.rider.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Clean Energy Rider</td>
                <td>Fixed</td>
                <td>${cur.clean.toFixed(2)}</td>
                <td>Fixed</td>
                <td>${prop.clean.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Taxes (NC Sales Tax)</td>
                <td>7.0%</td>
                <td>${cur.tax.toFixed(2)}</td>
                <td>7.0%</td>
                <td>${prop.tax.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="total-row-highlight">
                <td className="grand-total-label">Total Estimated Charges</td>
                <td></td>
                <td className="current-total">${cur.total.toFixed(2)}</td>
                <td></td>
                <td className="proposed-total">${prop.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #bbdefb', textAlign: 'center' }}>
            <span style={{ fontSize: '1.1rem', color: '#0d47a1' }}>
              <strong>Estimated Monthly Increase:</strong> ${(prop.total - cur.total).toFixed(2)} 
              ({(((prop.total - cur.total) / cur.total) * 100).toFixed(1)}%)
            </span>
          </div>

          {/* NEW: FORMAL DISCLAIMER SECTION */}
          <footer style={{ marginTop: '30px', padding: '20px', borderTop: '1px solid #eee' }}>
            <p style={{ fontSize: '0.8rem', color: '#777', lineHeight: '1.5', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <strong>Disclaimer:</strong> These calculations are estimates based on proposed rate filings and typical usage patterns. 
              Actual electricity bills vary significantly based on household energy efficiency, weather conditions, and 
              individual behavior. For Time-of-Use (TOU) and Flex schedules, your bill is highly dependent on <em>when</em> you 
              use energy; minor shifts in on-peak usage can result in large variations in total cost. Please consult your 
              official utility statement for exact billing details.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deep-dive" element={<DeepDive />} />
        <Route path="/data" element={<TableauPage />} />
      </Routes>
    </Router>
  );
}

export default App;