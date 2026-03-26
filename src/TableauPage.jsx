import React from 'react';
import Navbar from './Navbar';
import './App.css';

const TableauPage = () => {
  const tableauUrl = "https://public.tableau.com/views/DEPResidentialBill/Page1?:language=en-US&:display_count=n&:origin=viz_share_link";

  return (
    <div className="bill-page-bg">
      <div className="official-bill-container" style={{ maxWidth: '1100px' }}>
        <Navbar />
        <div className="bill-title-bar" style={{ padding: '20px' }}>
          <h2>Bill Analysis Dashboard</h2>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Interactive breakdown of residential billing structures and historical trends.
          </p>
        </div>

        <section 
          className="tableau-frame" 
          style={{ 
            width: '1000px', height: '800px', margin: '10px auto', 
            overflow: 'hidden', position: 'relative', border: '1px solid #ddd'
          }}
        >
          <tableau-viz 
            id="tableauViz"
            src={tableauUrl}
            device="desktop"            
            toolbar="hidden" 
            style={{ width: '1015px', height: '840px', position: 'absolute', top: '-2px', left: '-7px' }}
          />
        </section>
      </div>
    </div>
  );
};

export default TableauPage;