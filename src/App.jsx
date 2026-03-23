import { useState } from 'react'
import logo from './DukeEnergyLogo.png'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [usage, setUsage] = useState(1000);

  /**
   * CALIBRATION LOGIC (NCUC 2026 Benchmark):
   * Target: $165.66 for 1,000 kWh (including 7% NC Sales Tax)
   * Math: $154.82 (Subtotal) * 1.07 = $165.66
   * Breakdown: $14.00 (Base) + $121.19 (Energy) + $2.10 (Storm) + $16.01 (Riders) + $1.52 (Clean) = $154.82
   */
  const RATES = {
    current: { 
      base: 14.00, 
      energy: 0.12119, 
      storm: 0.00210, 
      riderRate: 0.01601, // Scaled: $16.01 / 1000 kWh
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

      {/* Intro */}
      <section className="site-intro">
        <h1>NC Residential Rate Impact Tool</h1>
        <Link to="/deep-dive" className="deep-dive-btn">
    Understand the Unbundled Bill Components →
        </Link>
        <div className="title-spacer"></div>
        <p>
          Duke Energy Progress has proposed multi-year rate hikes to the <strong>NC Utilities Commission (NCUC)</strong>. 
          This tool calculates your estimated impact based on the official 2026 typical bill benchmark.
        </p>
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

      {/* Interactive Table */}
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
                <span className="tooltip-trigger" data-tooltip="A fixed monthly fee independent of your energy use. It covers the essential costs of maintaining your service, including equipment maintenance, account management, and billing services.">
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
                <span className="tooltip-trigger" data-tooltip="The cost for the specific amount of electricity you used this month, calculated in kilowatt-hours (kWh).">
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
                <span className="tooltip-trigger" data-tooltip="This fee helps cover the repair costs from major weather events, such as Hurricane Helene. Spreading these costs over an extended period helps prevent sudden spikes in your bill and keeps your monthly rate predictable.">
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
                <span className="tooltip-trigger" data-tooltip="The Summary of Rider Adjustments cover costs such as: the variable cost of fuel which changes year to year from what is included in the base Energy Charge; the cost of demand-side management and energy efficiency (DSM/EE) programs; certain renewable energy costs; costs to assist low-income households to pay their electricity bill; and refunds of over-collections due to a reduction in income tax rates.">
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
                <span className="tooltip-trigger" data-tooltip="A charge that supports clean energy certificates and clean power initiatives specifically within North Carolina.">
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

      {/* Result Footer */}
      <div className="impact-footer">
        <div className="impact-text">
          ESTIMATED MONTHLY INCREASE: <span>${(proposed.total - current.total).toFixed(2)}</span>
        </div>
      </div>

      <footer className="regulatory-disclaimer">
        <div className="disclaimer-title">Regulatory Notice & Disclaimer</div>
        <p>
          Figures based on NCUC Docket No. E-2 SUB 1380. The $165.66 baseline represents a typical residential 
          bill for 1,000 kWh including tax. Public witness hearings are scheduled through April 2026.
        </p>
      </footer>
    </div>
  );
}

export default App;