import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './NCSEA_logo.png'; 

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <a href="https://energync.org" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="NCSEA" style={styles.logoImage} />
        </a>
      </div>
      
      <div style={styles.tabsContainer}>
        <Link 
          style={{...styles.tab, ...(isActive('/') ? styles.activeTab : {})}} 
          to="/"
        >
          Bill Estimator
        </Link>
        <Link 
          style={{...styles.tab, ...(isActive('/deep-dive') ? styles.activeTab : {})}} 
          to="/deep-dive"
        >
          Unbundled Bill Components
        </Link>
        <Link 
          style={{...styles.tab, ...(isActive('/data') ? styles.activeTab : {})}} 
          to="/data"
        >
          Electricity Bill Example
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '15px 40px 0 40px',
    backgroundColor: '#fff',
    borderBottom: '3px solid #98bf3c', 
    fontFamily: 'Helvetica, Arial, sans-serif'
  },
  logoContainer: { paddingBottom: '10px' },
  logoImage: { height: '55px', width: 'auto' },
  tabsContainer: { display: 'flex', gap: '8px' },
  tab: {
    textDecoration: 'none',
    color: '#636566', 
    fontWeight: '400',
    fontSize: '0.95rem',
    padding: '12px 25px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ddd',
    borderBottom: 'none',
    borderRadius: '8px 8px 0 0',
    transition: '0.2s'
  },
  activeTab: {
    backgroundColor: '#007dc3', 
    color: '#fff',
    borderColor: '#007dc3',
    fontWeight: '700'
  }
};

export default Navbar;