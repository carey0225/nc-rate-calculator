import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Navbar from './Navbar'; 
import './App.css';

const DeepDive = () => {
  const data = [
    { name: 'Fixed Production', value: 57.15, percent: '34%', source: 'North Carolina Utilities Commission. (2025). Order Accepting Stipulation and Granting General Rate Increase. Docket No. E-2, Sub 1300.' },
    { name: 'Fuel & Variable O&M', value: 47.89, percent: '29%', source: 'Duke Energy Progress. (2026). Annual Fuel and Fuel-Related Charge Adjustment. Docket No. E-2, Sub 1320.' },
    { name: 'Customer Costs', value: 28.11, percent: '17%', source: 'NCUC Annual Rider Adjustments. Consolidated Schedule of Residential Rider Adjustments (REPS, EE, and Storm Recovery).' },
    { name: 'Distribution', value: 24.26, percent: '15%', source: 'NCUC 2026 Infrastructure Report. Multi-Year Rate Plan Grid Improvement Filings.' },
    { name: 'Transmission', value: 8.25, percent: '5%', source: 'Duke Energy Progress. (2025). Cost of Service Study (COSS) Functionalization.' },
  ];

  const COLORS = ['#b84c4c', '#46a5af', '#587eb4', '#7d5ba1', '#8db357'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: '#fff', padding: '8px 12px', border: '1px solid #ccc', 
          borderRadius: '4px', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#00598c' }}>{payload[0].name}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.65; 
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight="bold" pointerEvents="none">
        {`$${value.toFixed(2)}`}
        <tspan x={x} y={y + 18}>{data[index].percent}</tspan>
      </text>
    );
  };

  return (
    <div className="bill-page-bg">
      <div className="official-bill-container">
        <Navbar />

        <div className="bill-title-bar" style={{ padding: '20px' }}>
          <h2 style={{ color: '#00598c' }}>Unbundled Bill Components</h2>
          <p style={{ color: '#666', marginTop: '10px' }}>Analyzing the core costs that make up a typical residential bill.</p>
        </div>

        <section className="chart-section" style={{ margin: '10px 0', padding: '0 20px' }}>
          <div className="blue-section-header" style={{ padding: '10px', color: 'white', fontWeight: 'bold' }}>
            Average Monthly Residential Bill Components
          </div>
          
          <div style={{ width: '100%', height: 450, marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={data}
                  cx="50%" cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={160}
                  stroke="#fff" strokeWidth={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ cursor: 'pointer', outline: 'none' }} />
                  ))}
                </Pie>
                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="rect" wrapperStyle={{ paddingLeft: '40px', right: 0 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* TECHNICAL COMPONENT ANALYSIS SECTION */}
        <section className="definitions-section" style={{ textAlign: 'left', marginBottom: '40px', padding: '0 20px' }}>
          <h3 style={{ color: '#00598c', borderBottom: '2px solid #eee', paddingBottom: '10px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Functional Cost Allocation
          </h3>
          
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ margin: '10px 0 5px', color: '#333' }}>🏗️ Fixed Production & Capacity</h4>
            <p style={{ fontSize: '0.9rem', margin: '0', color: '#444', lineHeight: '1.5' }}>
              Represents the <strong>Rate Base</strong> requirements for generation assets. This includes depreciation, return on equity (ROE), and fixed Operation & Maintenance (O&M) expenses for nuclear, thermal, and utility-scale renewable portfolios. These costs are functionalized as demand-related and allocated based on coincidental peak contributions.
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ margin: '10px 0 5px', color: '#333' }}>🔥 Variable Fuel & Purchased Power</h4>
            <p style={{ fontSize: '0.9rem', margin: '0', color: '#444', lineHeight: '1.5' }}>
              Accounts for the <strong>Marginal Cost of Energy (MCOE)</strong>. This includes FERC Account 501 (Fuel) and Account 555 (Purchased Power). In North Carolina, these are non-bypassable, volumetric pass-through charges adjusted annually via the Fuel Rider, subject to a true-up mechanism with no utility markup.
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ margin: '10px 0 5px', color: '#333' }}>📜 Regulatory Riders & Programs</h4>
            <p style={{ fontSize: '0.9rem', margin: '0', color: '#444', lineHeight: '1.5' }}>
              Functionalized costs associated with <strong>Demand Side Management (DSM)</strong>, Energy Efficiency (EE), and Renewable Energy Portfolio Standards (REPS). This category also includes securitized costs for Storm Recovery and Clean Energy Transition components as authorized under HB 951.
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ margin: '10px 0 5px', color: '#333' }}>🏘️ Distribution System Operations</h4>
            <p style={{ fontSize: '0.9rem', margin: '0', color: '#444', lineHeight: '1.5' }}>
              Costs associated with the <strong>low-voltage delivery system</strong> (sub-transmission to meter). This encompasses FERC Accounts 580–598, including line transformers, services, and customer-weighted allocations for billing, load research, and advanced metering infrastructure (AMI).
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ margin: '10px 0 5px', color: '#333' }}>🛣️ Transmission & Bulk Power</h4>
            <p style={{ fontSize: '0.9rem', margin: '0', color: '#444', lineHeight: '1.5' }}>
              Refers to high-voltage system costs (typically 100kV+) required to move bulk power from generation nodes to load centers. These costs are primarily determined by <strong>Open Access Transmission Tariff (OATT)</strong> rates and integrated resource planning (IRP) requirements for grid stability.
            </p>
          </div>
        </section>

        {/* DATA SOURCE LIST WITH NEW TITLE */}
        <section style={{ 
          marginTop: '60px', 
          padding: '40px 60px', 
          borderTop: '1px solid #eee',
          backgroundColor: '#fafafa'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h3 style={{ 
              fontSize: '0.9rem', 
              color: '#333', 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px',
              marginBottom: '30px',
              textAlign: 'left'
            }}>
              Data Sources
            </h3>

            {data.map((item, index) => (
              <div key={index} style={{ 
                marginBottom: '16px', 
                paddingLeft: '15px', 
                borderLeft: '2px solid #00598c',
                lineHeight: '1.4'
              }}>
                <span style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  fontSize: '0.75rem', 
                  color: '#00598c', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '2px' 
                }}>
                  {item.name}
                </span>
                <span style={{ 
                  display: 'block', 
                  fontSize: '0.85rem', 
                  color: '#555', 
                  fontStyle: 'italic' 
                }}>
                  {item.source}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeepDive;