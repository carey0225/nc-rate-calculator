import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Text } from 'recharts';
import './App.css';

const DeepDive = () => {
  // Data aligned with your reference image, sorted clockwise.
  const data = [
    { name: 'Fixed Production', value: 57.15, percent: '34%', covers: 'The operation, maintenance, and debt for building the power plants.', source: 'NCUC Docket E-2, Sub 1300' },
    { name: 'Fuel & Variable O&M', value: 47.89, percent: '29%', covers: 'The actual cost of coal, natural gas, and uranium used to make power.', source: 'NCUC Docket E-2, Sub 1320' },
    { name: 'Customer Costs', value: 28.11, percent: '17%', covers: 'Energy efficiency programs, clean energy (REPS), and storm recovery.', source: 'NCUC Annual Rider Adjustments' },
    { name: 'Distribution', value: 24.26, percent: '15%', covers: 'Your local poles, wires, transformers, and billing/metering costs.', source: 'NCUC 2026 Infrastructure Report' },
    { name: 'Transmission', value: 8.25, percent: '5%', covers: 'The "high-voltage highway" of large towers and lines that move power.', source: 'DEP 2025 COSS' },
  ];

  // Replicating the distinct blue/green palette with added contrast
  const COLORS = ['#d77a61', '#4eb6bf', '#658cc3', '#9674b9', '#a6c673'];

  // Custom function to create the dollar/percentage text label on each slice
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, percent, name }) => {
    const RADIAN = Math.PI / 180;
    // Calculate the position—'0.6' puts it inside the donut ring for clean readability
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <Text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
        {`$${value.toFixed(2)} (${(percent * 100).toFixed(0)}%)`}
      </Text>
    );
  };

  return (
    <div className="bill-container">
      {/* Header with Navigation */}
      <header className="bill-header">
        <div className="brand">
          <Link to="/" className="back-link">← Back to Estimator</Link>
          <h1 style={{ color: 'var(--duke-blue)' }}>Unbundled Bill Deep Dive</h1>
        }
      </header>

      {/* Visual Chart Section */}
      <section className="billing-details">
        <div className="details-header">Functional Cost Visualization (1,000 kWh / Month)</div>
        
        {/* RECHARTS SECTION - Modified for the 'exploded' look and direct labels */}
        <div style={{ width: '100%', height: 400, marginTop: '20px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                innerRadius={65}   // Set to create the "Donut" hole
                outerRadius={110}  // Outer ring
                paddingAngle={5}  // Added space to 'explode' the pieces
                dataKey="value"
                nameKey="name"
                // Crucial - added direct labels and percentage calculations
                label={renderCustomizedLabel} 
                labelLine={false} // Clean: no lines needed since text is inside the ring
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {/* Vertical Legend (matches the reference image placement) */}
              <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Data Table with Popups (Matches image_0.png content) */}
      <section className="billing-details" style={{ paddingTop: '0' }}>
        <div className="details-header">Detailed Cost Table (1,000 kWh Base)</div>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Functional Category</th>
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

      {/* Official Sources Footer */}
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