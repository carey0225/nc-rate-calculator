import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import './App.css';

const DeepDive = () => {
  const data = [
    { name: 'Fixed Production', value: 57.15, percent: '34%', covers: 'The operation, maintenance, and debt for building the power plants.', source: 'NCUC Docket E-2, Sub 1300' },
    { name: 'Fuel & Variable O&M', value: 47.89, percent: '29%', covers: 'The actual cost of coal, natural gas, and uranium used to make power.', source: 'NCUC Docket E-2, Sub 1320' },
    { name: 'Customer Costs', value: 28.11, percent: '17%', covers: 'Energy efficiency programs, clean energy (REPS), and storm recovery.', source: 'NCUC Annual Rider Adjustments' },
    { name: 'Distribution', value: 24.26, percent: '15%', covers: 'Your local poles, wires, transformers, and billing/metering costs.', source: 'NCUC 2026 Infrastructure Report' },
    { name: 'Transmission', value: 8.25, percent: '5%', covers: 'The "high-voltage highway" of large towers and lines that move power.', source: 'DEP 2025 COSS' },
  ];

  // Colors aligned with the NCUC functional cost chart
  const COLORS = ['#b84c4c', '#46a5af', '#587eb4', '#7d5ba1', '#8db357'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.65; // Positions text inside the slice
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
        {`$${value.toFixed(2)}`}
        <tspan x={x} y={y + 14}>{(percent * 100).toFixed(0)}%</tspan>
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

      <section className="billing-details">
        <div className="details-header">Functional Cost Visualization (1,000 kWh)</div>
        <div style={{ width: '100%', height: 400, marginTop: '20px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={135}
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