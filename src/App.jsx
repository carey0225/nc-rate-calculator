import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; 
import DeepDive from './DeepDive';
import './App.css';

const Home = () => {
  const [utility, setUtility] = useState('DEP'); 
  const [kwh, setKwh] = useState(1000); 
  const [rateType, setRateType] = useState('standard');

  // Technical Rate Schedules (Step 3 - 2026 Projections)
  const utilityData = {
    DEP: {
      label: "Duke Energy Progress",
      standard: {
        current: { customer: 14.00, energy: 0.11823, storm: 0.00210, rider: 0.01549, clean: 1.52 },
        proposed: { customer: 15.75, energy: 0.12620, storm: 0.00280, rider: 0.01810, clean: 1.95 },
        components: [
          { period: "Flat Rate", definition: "24/7 Universal Rate", rate: "$0.11823" }
        ]
      },
      tou: {
        current: { customer: 14.00, energy: 0.10850, storm: 0.00210, rider: 0.01549, clean: 1.52 },
        proposed: { customer: 16.50, energy: 0.11920, storm: 0.00280, rider: 0.01810, clean: 1.95 },
        components: [
          { period: "On-Peak", definition: "Summer: 6PM–9PM / Winter: 6AM–9AM", rate: "~$0.224" },
          { period: "Off-Peak", definition: "All other hours (excluding Discount)", rate: "~$0.118" },
          { period: "Discount", definition: "1 AM – 6 AM (Daily)", rate: "~$0.062" }
        ]
      },
      flex: {
        current: { customer: 14.00, energy: 0.09240, storm: 0.00210, rider: 0.01549, clean: 1.52 },
        proposed: { customer: 18.50, energy: 0.10810, storm: 0.00280, rider: 0.01810, clean: 1.95 },
        components: [
          { period: "On-Peak", definition: "Summer: 6PM–9PM / Winter: 6AM–9AM", rate: "~$0.285" },
          { period: "Discount", definition: "Daily 1AM–6AM & Winter 11AM–4PM", rate: "~$0.051" },
          { period: "Critical Peak", definition: "Grid Stress Events (Max 20 days/yr)", rate: "Varies" }
        ]
      }
    },
    DEC: {
      label: "Duke Energy Carolinas",
      standard: {
        current: { customer: 11.80, energy: 0.10840, storm: 0.00180, rider: 0.01750, clean: 1.20 },
        proposed: { customer: 13.11, energy: 0.11520, storm: 0.00240, rider: 0.02100, clean: 1.65 },
        components: [
          { period: "Flat Rate", definition: "24/7 Universal Rate", rate: "$0.10840" }
        ]
      },
      tou: {
        current: { customer: 11.80, energy: 0.09950, storm: 0.00180, rider: 0.01750, clean: 1.20 },
        proposed: { customer: 14.50, energy: 0.10850, storm: 0.00240, rider: 0.02100, clean: 1.65 },
        components: [
          { period: "On-Peak", definition: "Summer: 6PM–9PM / Winter: 6AM–9AM", rate: "~$0.211" },
          { period: "Off-Peak", definition: "All other hours (excluding Discount)", rate: "~$0.105" },
          { period: "Discount", definition: "1 AM – 6 AM (Daily)", rate: "~$0.058" }
        ]
      },
      flex: {
        current: { customer: 11.80, energy: 0.08850, storm: 0.00180, rider: 0.01750, clean: 1.20 },
        proposed: { customer: 16.00, energy: 0.09500, storm: 0.00240, rider: 0.02100, clean: 1.65 },
        components: [
          { period: "On-Peak", definition: "Summer: 6PM–9PM / Winter: 6AM–9AM", rate: "~$0.268" },
          { period: "Discount", definition: "Daily 1AM–6AM & Winter 11AM–4PM", rate: "~$0.048" },
          { period: "Critical Peak", definition: "Grid Stress Events (Max 20 days/yr)", rate: "Varies" }
        ]
      }
    }
  };

  const rateSchedules = {
    standard: { label: "Standard Residential (RES)", description: "The most common flat-rate plan." },
    tou: { label: "Smart Usage (R-TOU)", description: "Time-of-Use plan with variable peak rates." },
    flex: { label: "Flex Savings (Pilot)", description: "Shift usage to overnight/off-peak hours." }
  };

  const selectedUtility = utilityData[utility];
  const selectedRates = selectedUtility[rateType];

  const getDynamicDisclaimer = () => {
    const disclaimers = {
      standard: "Estimates based on flat-rate volumetric charges. This remains the baseline for most residential customer classes under current NCUC general rate cases.",
      tou: `Technical Note: The energy charge ($${selectedRates.current.energy.toFixed(5)}) represents a Load-Weighted Average. Actual billing is bifurcated across the On-Peak, Off-Peak, and Discount periods shown in the rate component table.`,
      flex: "Pilot Program Notice: Flex Savings calculations incorporate a higher fixed Basic Facilities Charge. Savings are highly dependent on avoiding coincident peak demand and utilizing winter discount windows."
    };
    return disclaimers[rateType] || disclaimers.standard;
  };

  const calculateBill = (r) => {
    const energyCharge = kwh * r.energy;
    const stormCharge = kwh * r.storm;
    const riderCharge = kwh * r.rider;
    const subtotal = r.customer + energyCharge + stormCharge + riderCharge + r.clean;
    const tax = subtotal * 0.07; 
    return {
      customer: r.customer, energy: energyCharge, storm: stormCharge,
      rider: riderCharge, clean: r.clean, tax: tax, total: subtotal + tax
    };
  };

  const cur = calculateBill(selectedRates.current);
  const prop = calculateBill(selectedRates.proposed);

  return (
    <div className="bill-page-bg">
      <div className="official-bill-container">
        <Navbar />

        <div className="bill-title-bar" style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#00598c', marginBottom: '5px' }}>NC Residential Rate Impact Tool</h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Projected 2026 Billing Impacts</p>
        </div>

        {/* PROVIDER TOGGLE */}
        <section style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '8px' }}>
            {['DEP', 'DEC'].map((u) => (
              <button key={u} onClick={() => setUtility(u)} style={{
                padding: '10px 25px', borderRadius: '6px', border: 'none',
                backgroundColor: utility === u ? '#00598c' : 'transparent',
                color: utility === u ? 'white' : '#555', cursor: 'pointer',
                fontWeight: 'bold', fontSize: '0.9rem'
              }}>
                {utilityData[u].label}
              </button>
            ))}
          </div>
        </section>

        {/* RATE SCHEDULE SELECTION */}
        <section style={{ padding: '0 20px 20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.keys(rateSchedules).map((key) => (
              <button key={key} onClick={() => setRateType(key)} style={{
                padding: '8px 16px', borderRadius: '20px', border: rateType === key ? 'none' : '1px solid #ccc',
                backgroundColor: rateType === key ? '#46a5af' : 'white', color: rateType === key ? 'white' : '#666',
                cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem'
              }}>
                {rateSchedules[key].label}
              </button>
            ))}
          </div>
        </section>

        {/* USAGE SLIDER */}
        <section className="usage-control-section" style={{ padding: '10px 20px 20px', backgroundColor: '#f9f9f9', borderRadius: '8px', margin: '0 20px 25px' }}>
          <div className="usage-focus">
            <span className="label">Monthly Energy Usage</span>
            <span className="value" style={{ color: '#00598c' }}>{kwh} kWh</span>
          </div>
          <input type="range" min="100" max="5000" step="10" value={kwh} onChange={(e) => setKwh(parseInt(e.target.value))} className="bill-slider" />
        </section>

        <div className="billing-details-wrapper">
          <table className="official-data-table">
            <thead>
              <tr className="blue-section-header">
                <th colSpan="5">Billing Analysis: {utilityData[utility].label}</th>
              </tr>
              <tr className="sub-header-row">
                <th align="left">Description</th>
                <th>Current (2025)</th>
                <th>Current Amount</th>
                <th>Proposed (2026)</th>
                <th>Proposed Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Basic Customer Charge</td><td>Fixed</td><td>${cur.customer.toFixed(2)}</td><td>Fixed</td><td>${prop.customer.toFixed(2)}</td></tr>
              <tr><td>Energy Charge (@ kWh)</td><td>${selectedRates.current.energy.toFixed(5)}</td><td>${cur.energy.toFixed(2)}</td><td>${selectedRates.proposed.energy.toFixed(5)}</td><td>${prop.energy.toFixed(2)}</td></tr>
              <tr><td>Storm Recovery Riders</td><td>${selectedRates.current.storm.toFixed(5)}</td><td>${cur.storm.toFixed(2)}</td><td>${selectedRates.proposed.storm.toFixed(5)}</td><td>${prop.storm.toFixed(2)}</td></tr>
              <tr><td>Other REPS/EE Riders</td><td>${selectedRates.current.rider.toFixed(5)}</td><td>${cur.rider.toFixed(2)}</td><td>${selectedRates.proposed.rider.toFixed(5)}</td><td>${prop.rider.toFixed(2)}</td></tr>
              <tr><td>Clean Energy Program</td><td>Fixed</td><td>${cur.clean.toFixed(2)}</td><td>Fixed</td><td>${prop.clean.toFixed(2)}</td></tr>
              <tr><td>NC Sales Tax (7.0%)</td><td>—</td><td>${cur.tax.toFixed(2)}</td><td>—</td><td>${prop.tax.toFixed(2)}</td></tr>
            </tbody>
            <tfoot>
              <tr className="total-row-highlight">
                <td className="grand-total-label">Total Monthly Bill</td>
                <td></td><td className="current-total">${cur.total.toFixed(2)}</td>
                <td></td><td className="proposed-total" style={{ color: '#d32f2f' }}>${prop.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          {/* DYNAMIC RATE COMPONENT TABLE */}
          <div style={{ marginTop: '30px', padding: '0 10px' }}>
            <h4 style={{ color: '#00598c', marginBottom: '10px', fontSize: '0.95rem', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
              Schedule {rateType.toUpperCase()} Detail: {utility}
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', backgroundColor: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #00598c', textAlign: 'left', color: '#666' }}>
                  <th style={{ padding: '8px' }}>Period</th>
                  <th style={{ padding: '8px' }}>Definition</th>
                  <th style={{ padding: '8px' }}>Actual Rate (approx.)</th>
                </tr>
              </thead>
              <tbody>
                {selectedRates.components.map((comp, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>{comp.period}</td>
                    <td style={{ padding: '8px' }}>{comp.definition}</td>
                    <td style={{ padding: '8px' }}>{comp.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* DYNAMIC TECHNICAL NOTE */}
          <div style={{ marginTop: '30px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #00598c', textAlign: 'left' }}>
               <p style={{ fontSize: '0.85rem', color: '#333', margin: 0, lineHeight: '1.5' }}>
                <strong>{rateType.toUpperCase()} Analysis:</strong> {getDynamicDisclaimer()}
              </p>
          </div>

          {/* STATIC GENERAL DISCLAIMER */}
          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fffbe6', borderRadius: '4px', border: '1px solid #ffe58f', textAlign: 'left' }}>
            <p style={{ fontSize: '0.82rem', color: '#856404', margin: 0, lineHeight: '1.5' }}>
              <strong>Important Notice:</strong> These figures are for estimation purposes only. Your actual monthly bill is influenced by 
              personal habits, living conditions, and household energy efficiency. For advanced schedules (TOU and Flex), 
              the total cost is highly dependent on <em>how and when</em> energy is used. Factors such as extreme weather, 
              appliance age, and coincident peak demand during high-stress grid periods will result in significant variations 
              from these estimates.
            </p>
          </div>

          <footer style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid #eee' }}>
            <p style={{ fontSize: '0.7rem', color: '#999', textAlign: 'center', maxWidth: '800px', margin: '0 auto', lineHeight: '1.4' }}>
              <strong>Regulatory Disclosure:</strong> Projections derived from NCUC Docket Nos. E-2 Sub 1300/1320 and E-7 Sub 1330. All values reflect Step 3 MYRP adjustments effective 2026.
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
      </Routes>
    </Router>
  );
}

export default App;