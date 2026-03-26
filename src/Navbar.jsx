import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const getTabClass = (path) => {
    return location.pathname === path ? 'nav-tab active' : 'nav-tab';
  };

  return (
    <nav className="top-nav-tabs">
      <Link to="/" className={getTabClass('/')}>
        Bill Estimator
      </Link>
      <Link to="/data" className={getTabClass('/data')}>
        Electricity Bill Example
      </Link>
      <Link to="/deep-dive" className={getTabClass('/deep-dive')}>
        Unbundled Bill Components
      </Link>
    </nav>
  );
};

export default Navbar;