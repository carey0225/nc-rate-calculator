import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ChartTooltip, Legend } from 'recharts';
import './App.css';

const DeepDive = () => {
  // Data aligned with your provided image
  const data = [
    { name: 'Generation / Fixed Production', value: 57.15, percent: '34%', covers: 'The operation, maintenance, and debt for building the power plants themselves.', source: 'NCUC Docket E-2, Sub 1300' },
    { name: 'Fuel & Variable O&M', value: 47.89, percent: '29%', covers: 'The actual cost of coal, natural gas, and uranium used to make power.', source: 'NCUC Docket E-2, Sub 1320' },
    { name: 'Customer Costs', value: 28.11, percent: '17%', covers: 'Energy efficiency programs, clean energy (REPS), and storm recovery.', source: 'NCUC Annual Rider Adjustments' },
    { name: 'Distribution', value: 24.26, percent: '15%', covers: 'Your local poles, wires, transformers, and the cost of billing/metering.', source: 'NCUC 2026 Infrastructure Report' },
    { name: 'Transmission', value: 8.25, percent: '5%', covers: 'The "high-voltage highway" of large towers and lines that move power across the state.', source: 'DEP 2025 COSS' },
  ];

  const COLORS = ['#00598c', '#007bbd', '#44a1d3', '#88c5e9', '#cce9f9'];

  return (
    <div className="bill-container">
      <header className="bill-header">
        <Link to="/" className="back-link">← Back to Estimator</Link>
        <h1 style={{ color: 'var(--duke-blue)' }}>DEP Unbundled Cost Analysis</h1>
      </header>

      {/* Visual Pie Chart Section */}
      <section className="billing-details">
        <div className="details-header">Cost Allocation Visualization</div>
        <div style={{ width: '100%', height: 350, marginTop: '20px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Detailed Table with Popups */}
      <section className="billing-details" style={{ paddingTop: '0' }}>
        <div className="details-header">DEP 1,000 kWh Monthly Breakdown</div>
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

      {/* Sources Footer */}
      <footer className="regulatory-disclaimer">
        <div className="disclaimer-title">Official Sources & Dockets</div>
        <ul style={{ fontSize: '0.8rem', paddingLeft: '20px' }}>
          {data.map((item, index) => (
            <li key={index}><strong>{item.name}:</strong> {item.source}</li>
          ))}
        </ul>
      </footer>
    </div>
  );
};

export default DeepDive;