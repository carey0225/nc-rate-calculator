import React, { useEffect } from 'react';
import Navbar from './Navbar';
import './App.css';

const TableauPage = () => {
  // CLEANED URL: Removed share parameters to prevent internal Tableau scroll bars
  const tableauUrl = "https://public.tableau.com/views/DEPResidentialBill/Page1";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embedding.tableau.com/api/tableau.embedding.3.latest.min.js";
    script.type = "module";
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const brandStyles = {
    blue: '#007dc3',
    gray: '#636566',
    lightGreen: '#98bf3c',
    fontFamily: 'Helvetica, Arial, sans-serif'
  };

  return (
    <div className="bill-page-bg" style={{ fontFamily: brandStyles.fontFamily }}>
      <div className="official-bill-container" style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100vh' }}>
        <Navbar />
        
        <div className="bill-title-bar" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2 style={{ color: brandStyles.blue, fontSize: '2.4rem', fontWeight: '700', marginBottom: '15px' }}>
            Electricity Bill Example
          </h2>
          <p style={{ color: brandStyles.gray, fontSize: '1.1rem', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7' }}>
            Interactive breakdown of residential billing structures and historical trends.
          </p>
        </div>

        {/* SECTION: The frame now matches the 800px requirement [cite: 3] */}
        <section 
          className="tableau-frame" 
          style={{ 
            width: '95%', 
            maxWidth: '1100px', 
            height: '800px', // Removed the citation tags that caused the error
            margin: '0 auto 40px auto', 
            position: 'relative',
            border: `1px solid #eee`,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            backgroundColor: '#fff',
            display: 'block',
            overflow: 'hidden' 
          }}
        >
          <tableau-viz 
            id="tableauViz"
            src={tableauUrl}
            device="desktop"             
            toolbar="hidden" 
            hide-tabs="true" // Explicitly hides tabs to save vertical space
            style={{ width: '100%', height: '100%' }} 
          />
        </section>

        <footer style={{ textAlign: 'center', padding: '40px', color: brandStyles.gray, fontSize: '0.85rem', borderTop: '1px solid #eee' }}>
          <p>Data Source: North Carolina Utilities Commission Public Records.</p>
        </footer>
      </div>
    </div>
  );
};

export default TableauPage;