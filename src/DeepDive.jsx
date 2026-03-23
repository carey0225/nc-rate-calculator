import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Reuse your styles

const DeepDive = () => {
  return (
    <div className="bill-container">
      <header className="bill-header">
        <Link to="/" className="back-link">← Back to Calculator</Link>
        <h1 style={{color: 'var(--duke-blue)'}}>Unbundled Bill Analysis</h1>
      </header>

      <section className="site-intro">
        <h2>Why is my bill "Unbundled"?</h2>
        <p>
          In 2023, the NCUC approved a transition to <strong>unbundled billing</strong>. 
          This separates the cost of generating power from the cost of 
          state-mandated programs, storm repairs, and fuel fluctuations.
        </p>
      </section>

      <section className="billing-details" style={{padding: '20px 35px'}}>
        <div className="info-card">
          <h3>1. Base Generation & Transmission</h3>
          <p>This is the core cost of building and maintaining power plants and the high-voltage lines that move power across North Carolina. This is the "Energy Charge" on your bill.</p>
        </div>

        <div className="info-card">
          <h3>2. The "Rider" Category</h3>
          <p>These are adjustments that Duke Energy Progress (DEP) is allowed to charge for specific expenses. They are "unbundled" so you can see exactly where the money goes:</p>
          <ul>
            <li><strong>Fuel Rider:</strong> A pass-through cost for the actual coal/gas burned. Duke makes $0 profit on this.</li>
            <li><strong>Storm Recovery:</strong> Pays for the multi-billion dollar repairs from past hurricanes like Helene.</li>
            <li><strong>EE/DSM:</strong> Funds energy efficiency programs (like HVAC rebates).</li>
            <li><strong>Clean Energy:</strong> Funds the 2035 Carbon Plan requirements.</li>
          </ul>
        </div>
      </section>

      <footer className="impact-footer">
        <p>Understanding these components is key to engaging with the 2026 Rate Case proceedings.</p>
      </footer>
    </div>
  );
};

export default DeepDive;