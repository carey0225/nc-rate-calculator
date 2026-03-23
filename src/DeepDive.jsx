import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import './App.css';

const DeepDive = () => {
  const data = [
    { name: 'Fixed Production', value: 57.15, percent: '34%', covers: 'Power plant construction, debt, and fixed staffing.', source: 'NCUC Docket E-2, Sub 1300' },
    { name: 'Fuel & Variable O&M', value: 47.89, percent: '29%', covers: 'Natural gas, coal, uranium, and consumable parts.', source: 'NCUC Docket E-2, Sub 1320' },
    { name: 'Customer Costs', value: 28.11, percent: '17%', covers: 'Programs like EE/DSM, REPS, and Storm Recovery.', source: 'NCUC Annual Rider Adjustments' },
    { name: 'Distribution', value: 24.26, percent: '15%', covers: 'Neighborhood lines, transformers, and billing.', source: 'NCUC 2026 Infrastructure Report' },
    { name: 'Transmission', value: 8.25, percent: '5%', covers: 'High-voltage "highways" across the state.', source: 'DEP 2025 COSS' },
  ];

  const COLORS = ['#b84c4c', '#46a5af', '#587eb4', '#7d5ba1', '#8db357'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.65; 
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight="bold">
        {`$${value.toFixed(2)}`}
        <tspan x={x} y={y + 18}>{data[index].percent}</tspan>
      </text>
    );
  };

  return (
    <div className="bill-container">
      <header className="bill-header">
        <div className="brand">
          <Link to="/" className="back-link">← Back to Estimator</Link>
          <h1 style={{ color: 'var(--duke-blue)', marginTop: '10px' }}>Unbundled Bill Deep Dive</h1>
        </div>
      </header>

      {/* Visual Chart Section */}
      <section className="billing-details">
        <div className="details-header">Average Monthly Residential Bill Components</div>
        <div style={{ width: '100%', height: 450, marginTop: '20px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150} 
                stroke="none"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend layout="vertical" align="right" verticalAlign="middle" iconType="rect" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* NEW: Context & Definitions Section */}
      <section className="site-intro" style={{ textAlign: 'left', marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--duke-blue)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>What are you paying for?</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '10px 0 5px' }}>🏗️ Fixed Production (Generation)</h4>
          <p style={{ fontSize: '0.95rem', margin: '0' }}>
            Think of this as the "Mortgage" on power plants. Whether you turn on a light or not, Duke has to pay off the debt and maintenance costs for the nuclear, gas, and solar plants that keep the grid ready.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '10px 0 5px' }}>🔥 Fuel & Variable O&M</h4>
          <p style={{ fontSize: '0.95rem', margin: '0' }}>
            This is the "Gas in the Tank." This cost fluctuates based on the global price of natural gas and coal. It is a direct pass-through, meaning Duke isn't supposed to make a profit on this specific line item.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '10px 0 5px' }}>📜 Customer Costs (Riders)</h4>
          <p style={{ fontSize: '0.95rem', margin: '0' }}>
            This covers state-mandated programs. It includes <strong>REPS</strong> (Renewable Energy Portfolio Standards), energy efficiency rebates, and <strong>Storm Recovery</strong> (paying off past hurricane damage through securitized bonds).
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '10px 0 5px' }}>🌳 Distribution & Transmission</h4>
          <p style={{ fontSize: '0.95rem', margin: '0' }}>
            The physical logistics. <strong>Transmission</strong> moves power across the state on high-voltage lines, while <strong>Distribution</strong> handles the "last mile"—the poles and transformers in your neighborhood.
          </p>
        </div>
      </section>

      <section className="billing-details" style={{ paddingTop: '0' }}>
        <div className="details-header">Detailed Cost Table</div>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Monthly Cost</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <span className="tooltip-trigger" data-tooltip={item.covers}>
                    {item.name}
                  </span>
                </td>
                <td>${item.value.toFixed(2)}</td>
                <td>{item.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="regulatory-disclaimer">
        <div className="disclaimer-title">Dockets and Source Data</div>
        <ul style={{ fontSize: '0.8rem', paddingLeft: '20px', lineHeight: '1.6' }}>
          {data.map((item, index) => (
            <li key={index}><strong>{item.name}:</strong> {item.source}</li>
          ))}
        </ul>
      </footer>
    </div>
  );
};

export default DeepDive;