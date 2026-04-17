import React, { useState } from 'react';
import Navbar from './Navbar';
import './App.css';

const EnergyMix = () => {
  // Percentages of the energy mix - now including Hydro
  const [mix, setMix] = useState({
    coal: 15,
    gas: 35,
    nuclear: 30,
    hydro: 10,
    renewables: 10
  });

  const brandStyles = {
    blue: '#007dc3',
    green: '#98bf3c',
    gray: '#636566',
    coal: '#333',
    gas: '#9ea1a2',
    nuclear: '#00a9ce',
    hydro: '#254c91', // Dark blue for water/hydro
    fontFamily: 'Helvetica, Arial, sans-serif'
  };

  const calculateImpact = () => {
    // Fuel costs: Coal/Gas are high, Nuclear/Hydro are low, Renewables are $0
    const fuelCost = (mix.coal * 0.6) + (mix.gas * 0.4) + (mix.nuclear * 0.1) + (mix.hydro * 0.05) + (mix.renewables * 0);
    
    // Infrastructure: Renewables/Nuclear/Hydro have higher fixed costs [cite: 22]
    const infraCost = (mix.coal * 0.3) + (mix.gas * 0.3) + (mix.nuclear * 0.6) + (mix.hydro * 0.5) + (mix.renewables * 0.8);
    
    // Carbon: Coal is 1.0, Gas is 0.5, others are 0
    const carbonScore = (mix.coal * 1.0) + (mix.gas * 0.5) + (mix.nuclear * 0) + (mix.hydro * 0) + (mix.renewables * 0);
    
    return {
      bill: 100 + (fuelCost + infraCost), 
      carbon: carbonScore
    };
  };

  const results = calculateImpact();

  const handleSlider = (source, val) => {
    const newValue = parseInt(val);
    const otherSources = Object.keys(mix).filter(s => s !== source);
    const totalOthers = otherSources.reduce((sum, s) => sum + mix[s], 0);
    
    // Rebalance logic to ensure total is always 100%
    const ratio = (100 - newValue) / totalOthers;
    const newMix = { ...mix, [source]: newValue };
    
    otherSources.forEach(s => {
      newMix[s] = Math.max(0, Math.round(mix[s] * ratio));
    });

    const finalSum = Object.values(newMix).reduce((a, b) => a + b, 0);
    if (finalSum !== 100) {
        const diff = 100 - finalSum;
        newMix[otherSources[0]] += diff;
    }

    setMix(newMix);
  };

  return (
    <div className="bill-page-bg" style={{ fontFamily: brandStyles.fontFamily }}>
      <div className="official-bill-container" style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>
        <Navbar />
        
        <header style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h1 style={{ color: brandStyles.blue, fontWeight: '700' }}>The Grid Balancer</h1>
          <p style={{ color: brandStyles.gray }}>Simulate the 2026 Carbon Plan by adjusting North Carolina's energy sources.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '0 40px' }}>
          {/* SLIDERS COLUMN */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '12px' }}>
            {Object.entries(mix).map(([source, val]) => (
              <div key={source} style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 'bold', textTransform: 'capitalize' }}>
                  <span style={{ color: brandStyles[source] || '#333' }}>{source}</span>
                  <span>{val}%</span>
                </div>
                <input 
                  type="range" 
                  value={val} 
                  min="0"
                  max="100"
                  onChange={(e) => handleSlider(source, e.target.value)} 
                  className="bill-slider" 
                  style={{ accentColor: brandStyles[source] || brandStyles.green }}
                />
              </div>
            ))}
          </div>

          {/* RESULTS COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: `2px solid ${brandStyles.blue}`, padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: brandStyles.gray, fontWeight: '700', letterSpacing: '1px' }}>ESTIMATED MONTHLY BILL</span>
              <h2 style={{ fontSize: '3rem', color: brandStyles.blue, margin: '10px 0' }}>${results.bill.toFixed(2)}</h2>
              <p style={{ fontSize: '0.85rem', color: brandStyles.gray }}>Adjusted for Fuel & Infrastructure shifts[cite: 22].</p>
            </div>

            <div style={{ border: `2px solid ${brandStyles.green}`, padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: brandStyles.gray, fontWeight: '700', letterSpacing: '1px' }}>CARBON INTENSITY</span>
              <div style={{ height: '20px', backgroundColor: '#eee', borderRadius: '10px', marginTop: '15px', overflow: 'hidden' }}>
                <div style={{ width: `${results.carbon}%`, height: '100%', backgroundColor: results.carbon > 50 ? '#ff4d4f' : brandStyles.green, transition: '0.5s' }} />
              </div>
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{results.carbon.toFixed(0)} / 100</p>
            </div>
          </div>
        </div>

        <div style={{ margin: '40px', padding: '25px', backgroundColor: '#fcfcfc', border: '1px solid #eee', borderRadius: '12px' }}>
          <h3 style={{ color: brandStyles.blue, marginTop: 0 }}>How the Mix Impacts Your Bill</h3>
          <p style={{ fontSize: '0.9rem', color: brandStyles.gray, lineHeight: '1.6' }}>
            <strong>Hydro & Nuclear:</strong> These provide stable, carbon-free "baseload" power[cite: 5, 22]. While they have very low fuel costs, they require significant ongoing investment in safety and infrastructure maintenance[cite: 22].
          </p>
          <p style={{ fontSize: '0.9rem', color: brandStyles.gray, lineHeight: '1.6', marginTop: '15px' }}>
            <strong>The Carbon Shift:</strong> As you decrease Coal and Gas, the "Carbon Intensity" drops, but the monthly bill may rise. This represents the real-world cost of building new generation facilities and transmission "highways" to deliver clean energy[cite: 22].
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnergyMix;