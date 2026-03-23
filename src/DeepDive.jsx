import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const DeepDive = () => {
  return (
    <div className="bill-container">
      {/* Header with Back Navigation */}
      <header className="bill-header">
        <div className="brand">
          <Link to="/" className="back-link">← Back to Bill Estimator</Link>
          <h1 style={{ color: 'var(--duke-blue)', marginTop: '10px' }}>
            Unbundled Bill Deep Dive
          </h1>
        </div>
      </header>

      {/* Educational Intro */}
      <section className="site-intro">
        <h2>What is "Unbundling"?</h2>
        <p>
          Historically, your electric bill was one flat rate per kWh. In 2023, the 
          <strong> NC Utilities Commission (NCUC)</strong> moved to an unbundled 
          structure. This forces the utility to show exactly which costs are 
          for generation versus state-mandated policy goals.
        </p>
      </section>

      {/* The Three Buckets of Your Bill */}
      <section className="billing-details" style={{ padding: '20px 35px' }}>
        
        <div className="info-card">
          <h3>⚡ 1. Base Generation & Transmission</h3>
          <p>
            This is the "core" of your bill. It pays for the fuel-agnostic infrastructure: 
            the power plants, high-voltage lines, and the workers who maintain them. 
            On your calculator, this is the <strong>Energy Charge</strong>.
          </p>
        </div>

        <div className="info-card">
          <h3>📊 2. The Summary of Rider Adjustments</h3>
          <p>
            Riders are "add-ons" that change more frequently than base rates. 
            By unbundling them, you can see how much you pay for:
          </p>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Fuel Rider:</strong> The fluctuating cost of natural gas and coal.</li>
            <li><strong>EE/DSM Rider:</strong> Funds energy efficiency rebates (like LED bulb or HVAC programs).</li>
            <li><strong>REPS Rider:</strong> Helps Duke meet NC's Renewable Energy Portfolio Standards.</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🌪️ 3. Storm Recovery & Clean Energy</h3>
          <p>
            These are specific policy-driven riders. <strong>Storm Recovery</strong> pays 
            off the debt from past hurricanes (securitization), while the 
            <strong>Clean Energy Rider</strong> directly funds the 2035 Carbon Plan 
            requirements for solar and nuclear expansion.
          </p>
        </div>

      </section>

      {/* Footer / Call to Action */}
      <div className="impact-footer">
        <p style={{ fontSize: '1.1rem' }}>
          Understanding these line items helps NC residents participate in 
          <strong> Public Witness Hearings</strong> regarding the 2026 Rate Case.
        </p>
      </div>

      <footer className="regulatory-disclaimer">
        <div className="disclaimer-title">Technical Data Sources</div>
        <p>
          Data derived from Duke Energy Progress Schedule RES-37 and NCUC Docket E-2 Sub 1380. 
          Rider rates are subject to annual "true-up" proceedings.
        </p>
      </footer>
    </div>
  );
};

export default DeepDive;