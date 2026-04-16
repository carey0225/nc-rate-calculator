import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Navbar from './Navbar'; 
import DeepDive from './DeepDive';
import TableauPage from './TableauPage'; 
import './App.css';

// --- ANALYTICS TRACKER COMPONENT ---
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  return null;
};

const Home = () => {
  const [utility, setUtility] = useState('DEP'); 
  const [kwh, setKwh] = useState(1000); 
  const [rateType, setRateType] = useState('standard');
  const [hoveredItem, setHoveredItem] = useState(null);

  const utilityData = {
    DEP: {
      label: "Duke Energy Progress",
      standard: {
        current: { customer: 14.00, energy: 0.12623, storm: 0.00210, rider: 0.02097, clean: 1.81 },
        proposed: { customer: 16.00, energy: 0.14981, storm: 0.002492, rider: 0.024888, clean: 2.15 },
        components: [{ period: "Flat Rate", definition: "24/7 Universal Rate", rate: "$0.14958" }]
      },
      tou: {
        current: { customer: 14.00, energy: 0.10850, storm: 0.00210, rider: 0.01549, clean: 1.81 },
        proposed: { customer: 16.00, energy: 0.11920, storm: 0.00280, rider: 0.01810, clean: 2.15 },
        components: [
          { period: "On-Peak", definition: "Summer: 6PM–9PM / Winter: 6AM–9AM", rate: "~$0.224" },
          { period: "Off-Peak", definition: "All other hours (excluding Discount)", rate: "~$0.118" },
          { period: "Discount", definition: "1 AM – 6 AM (Daily)", rate: "~$0.062" }
        ]
      },
      rtoud: {
        current: { customer: 14.00, energy: 0.10847, storm: 0.00210, rider: 0.01549, clean: 1.52 },
        proposed: { customer: 16.00, energy: 0.12854, storm: 0.00280, rider: 0.01810, clean: 1.95 },
        components: [
          { period: "On-Peak", definition: "6PM–9PM (Summer) / 6AM–9AM (Non-Summer)", rate: "$0.18531" },
          { period: "Off-Peak", definition: "All hours not designated On-Peak or Discount", rate: "$0.07860" },
          { period: "Discount", definition: "Daily: 1AM–6AM; Non-Summer: 11AM–4PM", rate: "$0.05151" }
        ]
      }
    },
    DEC: {
      label: "Duke Energy Carolinas",
      standard: {
        current: { customer: 14.00, energy: 0.122603, storm: 0.000467, rider: 0.004951, clean: 1.25 },
        proposed: { customer: 16.00, energy: 0.141541, storm: 0.000539, rider: 0.005716, clean: 1.44 },
        components: [{ period: "Flat Rate", definition: "24/7 Universal Rate", rate: "$0.12540" }]
      },
      tou: {
        current: { customer: 14.00, energy: 0.09950, storm: 0.00180, rider: 0.01750, clean: 1.20 },
        proposed: { customer: 16.00, energy: 0.10850, storm: 0.00240, rider: 0.02100, clean: 1.65 },
        components: [
          { period: "On-Peak", definition: "Summer: 6PM–9PM / Winter: 6AM–9AM", rate: "~$0.211" },
          { period: "Off-Peak", definition: "All other hours (excluding Discount)", rate: "~$0.105" },
          { period: "Discount", definition: "1 AM – 6 AM (Daily)", rate: "~$0.058" }
        ]
      },
      rtoud: {
        current: { customer: 14.00, energy: 0.08850, storm: 0.00180, rider: 0.01750, clean: 1.20 },
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
    standard: { label: "Standard Residential (RES)" },
    tou: { label: "Smart Usage (R-TOU)" },
    rtoud: { label: "Smart Usage Select (R-TOUD)" }
  };

  const selectedUtility = utilityData[utility];
  const selectedRates = selectedUtility[rateType];

  const brandStyles = {
    mainHeading: { color: '#007dc3', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: '700' },
    subHeading: { color: '#636566', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: '400' },
    providerText: { color: '#254c91', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: '700' },
    greenAccent: '#98bf3c',
    blueAccent: '#007dc3',
    grayText: '#636566'
  };

  const getDynamicDisclaimer = () => {
    const disclaimers = {
      standard: "These estimates are based on a volumetric charge per kWh consumed plus a monthly fixed charge. This remains the baseline for most residential customers according to the most recent annual rate cases when the North Carolina Utilities Commission determines how much the utility is allowed to adjust electricity rates.",
      tou: `Technical Note: The energy charge ($${selectedRates.current.energy.toFixed(5)}) represents a Load-Weighted Average.`,
      rtoud: "Schedule R-TOUD calculations incorporate a higher fixed Basic Facilities Charge and time-variable energy pricing."
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

  // --- KEY CHANGE 1: UPDATED RENDER FUNCTION ---
  const renderDescriptionCell = (text, tooltipText) => (
    <td 
      style={{ padding: '12px', position: 'relative', cursor: 'pointer' }}
      onMouseEnter={() => setHoveredItem(text)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <span style={{ borderBottom: `1px dotted ${brandStyles.grayText}` }}>{text}</span>
      {hoveredItem === text && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '0',
          backgroundColor: '#fff',
          color: brandStyles.grayText,
          padding: '15px',
          borderRadius: '8px',
          fontSize: '0.85rem',
          width: '260px',
          whiteSpace: 'normal',
          zIndex: 100,
          marginBottom: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          textAlign: 'left',
          lineHeight: '1.4'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: brandStyles.blueAccent }}></span>
            <strong style={{ color: '#333' }}>{text}</strong>
          </div>
          <div style={{ paddingLeft: '16px', color: brandStyles.grayText }}>
            {tooltipText}
          </div>
        </div>
      )}
    </td>
  );

  return (
    <div className="bill-page-bg" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="official-bill-container" style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100vh' }}>
        <Navbar />

        <div className="bill-title-bar" style={{ marginTop: '30px', textAlign: 'center' }}>
          <h2 style={brandStyles.mainHeading}>NC Residential Rate Impact Tool</h2>
          <p style={brandStyles.subHeading}>Projected 2026 Billing Impacts</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h3 style={brandStyles.providerText}>Select Your Electricity Provider</h3>
        </div>

        <section style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '8px' }}>
            {['DEP', 'DEC'].map((u) => (
              <button key={u} onClick={() => setUtility(u)} style={{
                padding: '10px 25px', borderRadius: '6px', border: 'none',
                backgroundColor: utility === u ? brandStyles.blueAccent : 'transparent',
                color: utility === u ? 'white' : brandStyles.grayText, cursor: 'pointer',
                fontWeight: 'bold', fontSize: '0.9rem', transition: '0.2s'
              }}>
                {utilityData[u].label}
              </button>
            ))}
          </div>
        </section>

        <section style={{ padding: '0 20px 25px', textAlign: 'center' }}>
          <h3 style={{ ...brandStyles.subHeading, fontSize: '1rem', marginBottom: '15px', fontWeight: '700' }}>
            Select Your Residential Rate Schedule*
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.keys(rateSchedules).map((key) => (
              <button key={key} onClick={() => setRateType(key)} style={{
                padding: '10px 22px', borderRadius: '25px', 
                border: rateType === key ? 'none' : `1px solid ${brandStyles.grayText}`,
                backgroundColor: rateType === key ? brandStyles.greenAccent : 'white', 
                color: rateType === key ? 'white' : brandStyles.grayText,
                cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', transition: '0.2s'
              }}>
                {rateSchedules[key].label}
              </button>
            ))}
          </div>
        </section>

        <section className="usage-control-section" style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', margin: '0 20px 30px', borderLeft: `6px solid ${brandStyles.blueAccent}` }}>
          <div className="usage-focus" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: '700', color: brandStyles.grayText }}>Monthly Energy Usage</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: brandStyles.blueAccent }}>{kwh} kWh</span>
          </div>
          <input type="range" min="100" max="5000" step="10" value={kwh} onChange={(e) => setKwh(parseInt(e.target.value))} className="bill-slider" />
        </section>

        <div className="billing-details-wrapper" style={{ padding: '0 50px' }}>
          <table className="official-data-table" style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ backgroundColor: brandStyles.blueAccent, color: 'white' }}>
                <th colSpan="5" style={{ padding: '15px', fontSize: '1.1rem' }}>Billing Analysis: {utilityData[utility].label}</th>
              </tr>
              <tr style={{ backgroundColor: '#f2f2f2', color: '#333', fontSize: '0.90rem' }}>
                <th style={{ padding: '10px', textAlign: 'center' }}>Description</th>
                <th>Current Rate</th>
                <th>Current Amount</th>
                <th>Proposed Rate</th>
                <th>Proposed Amount</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.9rem' }}>
              {/* --- KEY CHANGE 2 & 3: EDITING TEXT HERE --- */}
              <tr style={{ borderBottom: '1px solid #eee' }}>
                {renderDescriptionCell("Basic Customer Charge", "A fixed monthly fee that covers the cost of meter reading, billing, and maintaining your service connection regardless of usage.")}
                <td>Fixed</td><td>${cur.customer.toFixed(2)}</td><td>Fixed</td><td>${prop.customer.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                {renderDescriptionCell("Energy Charge", "The cost for the actual electricity consumed (per kWh). This varies based on your total monthly usage.")}
                <td>${selectedRates.current.energy.toFixed(5)}</td><td>${cur.energy.toFixed(2)}</td><td>${selectedRates.proposed.energy.toFixed(5)}</td><td>${prop.energy.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                {renderDescriptionCell("Storm Recovery Charge", "Funds used to repair the grid and restore power following major named storms and extreme weather events.")}
                <td>${selectedRates.current.storm.toFixed(5)}</td><td>${cur.storm.toFixed(2)}</td><td>${selectedRates.proposed.storm.toFixed(5)}</td><td>${prop.storm.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                {renderDescriptionCell("Summary of Rider Adjustments", "Includes variable costs like fuel, energy efficiency programs, and specific regulatory adjustments.")}
                <td>${selectedRates.current.rider.toFixed(5)}</td><td>${cur.rider.toFixed(2)}</td><td>${selectedRates.proposed.rider.toFixed(5)}</td><td>${prop.rider.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                {renderDescriptionCell("Clean Energy Rider", "Supports the transition to carbon-free generation and state-mandated renewable energy targets.")}
                <td>Fixed</td><td>${cur.clean.toFixed(2)}</td><td>Fixed</td><td>${prop.clean.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                {renderDescriptionCell("NC Sales Tax (7.0%)", "State-mandated sales tax applied to the subtotal of all electric service charges.")}
                <td>—</td><td>${cur.tax.toFixed(2)}</td><td>—</td><td>${prop.tax.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#fdfdfd' }}>
                <td style={{ padding: '20px', fontWeight: '700', fontSize: '1.1rem' }}>Total Monthly Bill</td>
                <td></td><td style={{ fontWeight: '700' }}>${cur.total.toFixed(2)}</td>
                <td></td><td style={{ fontWeight: '700', color: '#d32f2f', fontSize: '1.2rem' }}>${prop.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div style={{ marginTop: '50px' }}>
            <h4 style={{ color: brandStyles.blueAccent, marginBottom: '10px', fontSize: '0.95rem', borderBottom: `2px solid ${brandStyles.greenAccent}`, paddingBottom: '5px' }}>
              Schedule {
                rateType === 'tou' ? 'R-TOU' : 
                rateType === 'rtoud' ? 'R-TOUD' : 
                rateType.toUpperCase()
                        } Detail: {utility}
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', backgroundColor: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ddd', color: brandStyles.grayText }}>
                  <th style={{ padding: '8px', textAlign: 'center' }}>Period</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>Definition</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>Actual Rate (approx.)</th>
                </tr>
              </thead>
              <tbody>
                {selectedRates.components.map((comp, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '8px', fontWeight: 'bold', textAlign: 'center', color: brandStyles.blueAccent }}>{comp.period}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{comp.definition}</td>
                    <td style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{comp.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '50px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', borderLeft: `4px solid ${brandStyles.blueAccent}` }}>
            <p style={{ fontSize: '0.85rem', color: brandStyles.grayText, margin: 0 }}>
              <strong>{
                rateType === 'tou' ? 'R-TOU' : 
                rateType === 'rtoud' ? 'R-TOUD' : 
                rateType.toUpperCase()
                      } Analysis:</strong> {getDynamicDisclaimer()}
            </p>
          </div>

          <div style={{ marginTop: '50px', padding: '15px', backgroundColor: '#fffbe6', borderRadius: '4px', border: '1px solid #ffe58f' }}>
            <p style={{ fontSize: '0.82rem', color: '#856404', margin: 0, lineHeight: '1.5' }}>
              <strong>Individual Usage Note:</strong> These figures are estimates based on average consumption models. Your actual bill will vary based on household size, personal energy habits, appliance efficiency, and home insulation. Factors such as extreme weather conditions, water heater settings, and the use of high-energy equipment (like EVs or pool pumps) can significantly affect your monthly total.
            </p>
          </div>

          <footer style={{ marginTop: '40px', padding: '30px 0', borderTop: `1px solid #eee` }}>
            <p style={{ fontSize: '0.75rem', color: '#999', textAlign: 'center', lineHeight: '1.4' }}>
              <strong>Data Sources:</strong> NCUC Dockets E-7 Sub 1276 & E-2 Sub 1300.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <AnalyticsTracker /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deep-dive" element={<DeepDive />} />
        <Route path="/data" element={<TableauPage />} /> 
      </Routes>
    </>
  );
}

export default App;