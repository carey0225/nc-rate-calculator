import { useState } from 'react'
import { Link } from 'react-router-dom' // Crucial for the second page
import logo from './DukeEnergyLogo.png'
import './App.css'

function App() {
  const [usage, setUsage] = useState(1000);

  /**
   * CALIBRATED RATES (NCUC 2026 Benchmark):
   * Target: $165.66 for 1,000 kWh (including 7% NC Sales Tax)
   * Math: $154.82 (Subtotal) * 1.07 = $165.66
   */
  const RATES = {
    current: { 
      base: 14.00, 
      energy: 0.12119, 
      storm: 0.00210, 
      riderRate: 0.01601, 
      clean: 1.52 
    },
    proposed: { 
      base: 15.75, 
      energy: 0.14420, 
      storm: 0.00280, 
      riderRate: 0.02410, 
      clean: 1.95 
    }
  };

  const getBillBreakdown = (config) => {
    const energyVal = usage * config.energy;
    const stormVal = usage * config.storm;
    const ridersVal = usage * config.riderRate;
    
    const subtotal = config.base + energyVal + stormVal + ridersVal + config.clean;
    const tax = subtotal * 0.07;
    
    return {
      base: config.base.toFixed(2),
      energy: energyVal.toFixed(2),
      storm: stormVal.toFixed(2),
      riders: ridersVal.toFixed(2),
      clean: config.clean.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + tax).toFixed(2)
    };
  };

  const current = getBillBreakdown(RATES.current);
  const proposed = getBillBreakdown(RATES.proposed);

  return (
    <div className="bill-container">
      {/* Header */}
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

      {/* Intro Section */}
      <section className="site-intro">
        <h1>NC Residential Rate Impact Tool</h1>
        <div className="title-spacer"></div>
        <p>
          Duke Energy Progress has proposed multi-year rate hikes to the <strong>NC Utilities Commission (NCUC)</strong>. 
          Use the slider below to see how your specific monthly bill might change.
        </p>
        
        {/* New Button to the Deep Dive Page */}
        <Link to="/deep-dive" className="deep-dive-btn">
          Understand the Unbundled Bill Components →
        </Link>
        
        <div className="intro-highlight">
          Typical NC Residential Bill (1,000 kWh): <strong>$165.66</strong>
        </div>
      </section>

      {/* Slider Section */}
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

      {/* Table Section */}
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
              <td>
                <span className="tooltip-trigger" data-tooltip="The flat monthly fee to be a customer, regardless of how much power you use.">
                  Basic Customer Charge
                </span>
              </td>
              <td className="rate-col">Fixed</td>
              <td>${current.base}</td>
              <td className="rate-col">Fixed</td>
              <td>${proposed.base}</td>
            </tr>
            <tr>
              <td>
                <span className="tooltip-trigger" data-tooltip="The core cost for electricity generation and transmission.">
                  Energy Charge
                </span>
              </td>
              <td className="rate-col">@{RATES.current.energy.toFixed(5)}</td>
              <td>${current.energy}</td>
              <td className="rate-col">@{RATES.proposed.energy.toFixed(5)}</td>
              <td>${proposed.energy}</td>
            </tr>
            <tr>
              <td>
                <span className="tooltip-trigger" data-tooltip="Repays costs for grid repairs after major NC storms.">
                  Storm Recovery Charge
                </span>
              </td>
              <td className="rate-col">@{RATES.current.storm.toFixed(5)}</td>
              <td>${current.storm}</td>
              <td className="rate-col">@{RATES.proposed.storm.toFixed(5)}</td>
              <td>${proposed.storm}</td>
            </tr>
            <tr>
              <td>
                <span className="tooltip-trigger" data-tooltip="Usage-based fees for fuel costs and energy efficiency programs.">
                  Summary of Rider Adjustments
                </span>
              </td>
              <td className="rate-col">@{RATES.current.riderRate.toFixed(5)}</td>
              <td>${current.riders}</td>
              <td className="rate-col">@{RATES.proposed.riderRate.toFixed(5)}</td>
              <td>${proposed.riders}</td>
            </tr>
            <tr>
              <td>
                <span className="tooltip-trigger" data-tooltip="Funds the transition to solar, wind, and carbon-free energy.">
                  Clean Energy Rider
                </span>
              </td>
              <td className="rate-col">Fixed</td>
              <td>${current.clean}</td>
              <td className="rate-col">Fixed</td>
              <td>${proposed.clean}</td>
            </tr>
            <tr className="tax-row">
              <td>Taxes (NC Sales Tax)</td>
              <td className="rate-col">7.0%</td>
              <td>${current.tax}</td>
              <td className="rate-col">7.0%</td>
              <td>${proposed.tax}</td>
            </tr>
            <tr className="total