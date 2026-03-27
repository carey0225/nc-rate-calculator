import React, { useEffect } from 'react';
import Navbar from './Navbar';
import './App.css';

const TableauPage = () => {
  const tableauUrl = "https://public.tableau.com/views/DEPResidentialBill/Page1?:language=en-US&:display_count=n&:origin=viz_share_link";

  useEffect(() => {
    // Load the Tableau Embedding API v3 script dynamically
    const script = document.createElement("script");
    script.src = "https://embedding.tableau.com/api/tableau.embedding.3.latest.min.js";
    script.type = "module";
    document.head.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

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
    width: '100%', 
    maxWidth: '1000px', 
    height: '800px',          // Fixed height is crucial
    minHeight: '800px',       // Prevents collapse
    margin: '20px auto', 
    position: 'relative',      // Keeps absolute children inside
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9', // If you see a gray box, the page LOADED!
    display: 'block'           // Ensures it behaves as a container
  }}
>
  <tableau-viz 
    id="tableauViz"
    src={tableauUrl}
    device="desktop"            
    toolbar="hidden" 
    style={{ width: '100%', height: '100%' }} // Let it fill the section
  />
</section>
      </div>
    </div>
  );
};

export default TableauPage;