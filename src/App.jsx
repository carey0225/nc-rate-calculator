import { useState } from 'react'
import logo from './DukeEnergyLogo.png'
import './App.css'

function App() {
  const [usage, setUsage] = useState(1000);

  // Updated with 2026/2027 NCUC Filing Estimates for Duke Energy Progress (DEP)
  const RATES = {
    current: { base: 14.00, energy: 0.12119, storm: 0.00210, riderSum: 18.51, clean: 1.52 },
    proposed: { base: 15.75, energy: 0.14420, storm: 0.00280, riderSum: 24.10, clean: 1.95 }
  };

  const getBillBreakdown = (config) => {
    const energyVal = usage * config.energy;
    const stormVal = usage * config.storm;
    const subtotal = config.base + energyVal + stormVal + config.riderSum + config.clean;
    const tax = subtotal * 0.07;
    
    return {
      base: config.base.toFixed(2),
      energy: energyVal.toFixed(2),
      storm: stormVal.toFixed(2),
      riders: config.riderSum.toFixed(2),
      clean: config.clean.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + tax).toFixed(2)
    };
  };

  const current = getBillBreakdown(RATES.current);
  const proposed = getBillBreakdown(RATES.proposed);

  return (
    <div className="bill-container">
      <div className="bill-header">
        <div className="brand">
          <img src={logo} alt="Duke Energy Progress Logo" className="bill-logo" />
        </div>
        <div className="bill-meta">
          <div className="account-row"><strong>Account number</strong> 0000 0000 0000</div>
          <div className="address-box">
            VALUED CUSTOMER<br/>
            CLAYTON, NC 27527
          </div>
        </div>
      </div>

      <section className="site-intro">
        <h1>NC Residential Rate Impact Tool</h1>
        <div className="title-spacer"></div>
        <p>
          Duke Energy Progress has proposed multi-year rate hikes to the <strong>NC Utilities Commission (NCUC)</strong>. 
          If approved, residential customers could see an average 18.5% increase by 2028.
        </p>
        <div className="intro-highlight">
          This tool helps NC families visualize how these shifts—driven by grid modernization 
          and data center demand—affect their specific monthly costs.
        </div>
      </section>

      <section className="usage-snapshot">
        <div className="snapshot-header">Adjust Your Monthly Usage</div>
        
        <div className="slider-container">
          <div className="usage-display">
            <span className="kwh-label">Monthly Energy Usage</span>
            <span className="kwh-value">{usage} kWh</span>
          </div>
          <input 
            type="range" min="100" max="5000" step="10"
            className="pronounced-slider"
            value={usage} onChange={(e) => setUsage(Number(e.target.value))}
          />
          <div className="slider-labels">
            <span>100 kWh</span>
            <span>5000 kWh</span>
          </div>
        </div>
      </section>

      <section className="billing-details">
        <div className="details-header">
          Billing details - Residential Service (RES)
        </div>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Description</th>
              <th className="rate-col">Current Rate</th>
              <th>Current Amount</th>
              <th className="rate-col">Proposed Rate</th>
              <th>Proposed Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Customer Charge</td>
              <td className="rate-col">Fixed</td>
              <td>${current.base}</td>
              <td className="rate-col">Fixed</td>
              <td>${proposed.base}</td>
            </tr>
            <tr>
              <td>Energy Charge</td>
              <td className="rate-col">@{RATES.current.energy.toFixed(5)}</td>
              <td>${current.energy}</td>
              <td className="rate-col">@{RATES.proposed.energy.toFixed(5)}</td>
              <td>${proposed.energy}</td>
            </tr>
            <tr>
              <td>Storm Recovery Charge</td>
              <td className="rate-col">@{RATES.current.storm.toFixed(5)}</td>
              <td>${current.storm}</td>
              <td className="rate-col">@{RATES.proposed.storm.toFixed(5)}</td>
              <td>${proposed.storm}</td>
            </tr>
            <tr>
              <td>Summary of Rider Adjustments</td>
              <td className="rate-col">Adjustable</td>
              <td>${current.riders}</td>
              <td className="rate-col">Adjustable</td>
              <td>${proposed.riders}</td>
            </tr>
            <tr>
              <td>Clean Energy Rider</td>
              <td className="rate-col">Adjustable</td>
              <td>${current.clean}</td>
              <td className="rate-col">Adjustable</td>
              <td>${proposed.clean}</td>
            </tr>
            <tr className="tax-row">
              <td>Taxes (NC Sales Tax)</td>
              <td className="rate-col">7.0%</td>
              <td>${current.tax}</td>
              <td className="rate-col">7.0%</td>
              <td>${proposed.tax}</td>
            </tr>
            <tr className="total-row">
              <td><strong>Total Estimated Charges</strong></td>
              <td className="rate-col"></td>
              <td><strong>${current.total}</strong></td>
              <td className="rate-col"></td>
              <td className="proposed-total"><strong>${proposed.total}</strong></td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="impact-footer">
        <div className="impact-text">
          ESTIMATED MONTHLY INCREASE: <span>${(proposed.total - current.total).toFixed(2)}</span>
        </div>
      </div>

      <footer className="regulatory-disclaimer">
        <div className="disclaimer-title">Regulatory Notice & Disclaimer</div>
        <p>
          Figures based on NCUC Docket No. E-2 SUB 1380. Actual impacts vary 
          by household behavior and final commission rulings.
        </p>
      </footer>
    </div>
  );
}

export default App;