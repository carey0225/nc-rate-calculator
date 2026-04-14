import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Navbar from './Navbar';
import './App.css';

const DeepDive = () => {
  const [activeUtility, setActiveUtility] = useState('DEP');

  const utilityData = {
    DEP: {
      total: 165.66,
      fullName: "Duke Energy Progress",
      chart: [
        { name: 'Fuel & Variable O&M', value: 47.89, percentage: '29%', fill: '#007dc3', bg: '#f4faff', detail: 'Actual cost of coal, gas, and uranium used to generate power.' },
        { name: 'Transmission', value: 8.25, percentage: '5%', fill: '#98bf3c', bg: '#f6fff4', detail: 'The "high-voltage highway" of large towers and lines.' },
        { name: 'Distribution', value: 24.26, percentage: '15%', fill: '#254c91', bg: '#f0fbfc', detail: 'Local poles, transformers, and billing ($14 fixed + $25 usage).' },
        { name: 'Generation / Fixed Production', value: 57.15, percentage: '34%', fill: '#00a9ce', bg: '#f0f9ff', detail: 'Operation, maintenance, and debt for building power plants.' },
        { name: 'Customer Costs', value: 28.11, percentage: '17%', fill: '#636566', bg: '#f8f9fa', detail: 'Energy efficiency, clean energy (REPS), and storm recovery.' },
      ]
    },
    DEC: {
      total: 134.34,
      fullName: "Duke Energy Carolinas",
      chart: [
        { name: 'Fuel & Variable O&M', value: 29.25, percentage: '22%', fill: '#007dc3', bg: '#f4faff', detail: 'Actual cost of coal, gas, and uranium used to generate power.' },
        { name: 'Transmission', value: 15.43, percentage: '11%', fill: '#98bf3c', bg: '#f6fff4', detail: 'The "high-voltage highway" of large towers and lines.' },
        { name: 'Distribution', value: 32.71, percentage: '24%', fill: '#254c91', bg: '#f0fbfc', detail: 'Local poles, transformers, and billing ($14 fixed + $25 usage).' },
        { name: 'Generation / Fixed Production', value: 42.55, percentage: '32%', fill: '#00a9ce', bg: '#f0f9ff', detail: 'Operation, maintenance, and debt for building power plants.' },
        { name: 'Customer Costs', value: 14.40, percentage: '11%', fill: '#636566', bg: '#f8f9fa', detail: 'Energy efficiency, clean energy (REPS), and storm recovery.' },
      ]
    }
  };

  const currentData = utilityData[activeUtility];

  const brandStyles = {
    blue: '#007dc3',
    green: '#98bf3c',
    gray: '#636566',
    darkBlue: '#254c91',
    fontFamily: 'Helvetica, Arial, sans-serif'
  };

  return (
    <div className="bill-page-bg" style={{ fontFamily: brandStyles.fontFamily }}>
      <div className="official-bill-container" style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100vh' }}>
        <Navbar />

        {/* SECTION 1: HEADER & INTRO */}
        <header style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h1 style={{ color: brandStyles.blue, fontSize: '2.4rem', marginBottom: '15px', fontWeight: '700' }}>Unbundling Your Energy Dollar</h1>
          <p style={{ color: brandStyles.gray, fontSize: '1.1rem', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7' }}>
            Most people only see the bottom line on their monthly statement. But behind that total is a complex web of costs 
            required to keep North Carolina powered 24/7. This page <strong>unbundles</strong> the 2026 rate projections, 
            separating the cost of fuel from the infrastructure that delivers it.
          </p>

          {/* UTILITY TOGGLE */}
          <div style={{ marginTop: '30px', display: 'inline-flex', backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '8px' }}>
            {['DEP', 'DEC'].map((u) => (
              <button 
                key={u} 
                onClick={() => setActiveUtility(u)} 
                style={{
                  padding: '12px 35px', borderRadius: '6px', border: 'none',
                  backgroundColor: activeUtility === u ? brandStyles.blue : 'transparent',
                  color: activeUtility === u ? 'white' : brandStyles.gray, cursor: 'pointer',
                  fontWeight: 'bold', fontSize: '0.95rem', transition: 'all 0.2s'
                }}
              >
                {utilityData[u].fullName}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 2: THE DONUT CHART */}
        <section style={{ padding: '0 20px' }}>
          <div style={{ width: '100%', backgroundColor: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #eee', marginBottom: '40px', position: 'relative' }}>
            <h3 style={{ color: brandStyles.blue, textAlign: 'center', marginBottom: '5px', fontWeight: '700' }}>2026 Monthly Cost of Service: {activeUtility}</h3>
            <p style={{ textAlign: 'center', fontSize: '1rem', color: brandStyles.gray, marginBottom: '20px' }}>
              Projected breakdown for a typical 1,000 kWh residential bill
            </p>
            
            <div style={{ height: 450 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData.chart}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={145}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    animationDuration={1000}
                  >
                    {currentData.chart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [`$${value.toFixed(2)} (${props.payload.percentage})`, name]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', padding: '15px', fontFamily: brandStyles.fontFamily }}
                  />
                  <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '30px', fontFamily: brandStyles.fontFamily }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '56%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
                <span style={{ fontSize: '0.8rem', color: brandStyles.gray, display: 'block', letterSpacing: '1px', fontWeight: '700' }}>MONTHLY TOTAL</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: brandStyles.blue }}>${currentData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE WRITE-UP */}
        <section style={{ padding: '0 20px 40px' }}>
          <div style={{ background: '#fcfcfc', border: '1px solid #eee', borderRadius: '12px', padding: '35px', marginBottom: '40px' }}>
            <h2 style={{ color: brandStyles.blue, marginTop: 0, fontWeight: '700' }}>DEP vs. DEC: Why do the numbers differ?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '20px' }}>
              <p style={{ color: brandStyles.gray, lineHeight: '1.7', margin: 0 }}>
                <strong>The Fuel Gap:</strong> You’ll notice <strong>DEP</strong> typically has a higher fuel percentage (29%). 
                This is driven by a unique mix of natural gas and nuclear generation required to meet the specific peak demand 
                profiles of eastern North Carolina.
              </p>
              <p style={{ color: brandStyles.gray, lineHeight: '1.7', margin: 0 }}>
                <strong>Infrastructure Costs:</strong> <strong>DEC</strong> carries higher Transmission costs (11%) 
                due to the density of the Charlotte and Triad hubs, requiring more complex "high-voltage highways" to move power into major urban centers.
              </p>
            </div>
            <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#f9fcf4', borderRadius: '8px', borderLeft: `4px solid ${brandStyles.green}` }}>
              <p style={{ margin: 0, color: brandStyles.darkBlue, fontWeight: 600 }}>
                The 2026 Shift: Across both utilities, a larger slice of your bill is shifting toward Generation and Transmission. 
                This represents the "Carbon Plan" in action—retiring coal and building the infrastructure for a cleaner grid.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: INFO CARDS */}
        <section style={{ padding: '0 20px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {currentData.chart.map((item, index) => (
            <div 
              key={index} 
              className="info-card" 
              style={{ 
                background: item.bg, 
                padding: '25px', 
                borderRadius: '12px', 
                borderLeft: `5px solid ${item.fill}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <h4 style={{ color: item.fill === '#636566' ? '#333' : item.fill, marginTop: 0, fontWeight: '700' }}>
                {index + 1}. {item.name} ({item.percentage})
              </h4>
              <p style={{ fontSize: '0.9rem', color: brandStyles.gray, lineHeight: '1.5', marginBottom: '15px' }}>
                {item.detail}
              </p>
              <div style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>
                Allocated Cost: ${item.value.toFixed(2)}
              </div>
            </div>
          ))}
        </section>

        <footer style={{ textAlign: 'center', padding: '40px', color: brandStyles.gray, fontSize: '0.85rem', borderTop: '1px solid #eee' }}>
          <p>Data Source: Projected 2026 Cost of Service Studies (NCUC Docket Nos. E-2 Sub 1300 & E-7 Sub 1330).</p>
          <p style={{ marginTop: '10px' }}>Individual results vary based on actual household usage patterns and weather extremes.</p>
        </footer>
      </div>
    </div>
  );
};

export default DeepDive;