import React, { useState } from 'react';
import "../mobile.css"

function header() {
   const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };
  return (
    <div>
        <header>
        <nav className="navbar">
            <div className="logo"><a href="#">Phishing<span>URLs</span></a></div>
            <ul  className={`navlinks dropdown ${menuOpen ? 'show' : ''}`} id="dropdown">
                <li><a href="#">Home</a></li>
                <li><a href="#learn">Build Awareness</a></li>
            </ul>

            {/* mobile */}
             <div className={`menu-btn ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar first"></div>
                <div className="bar second"></div>
                <div className="bar third"></div>
            </div> 
        </nav>
    </header>
    </div>
  )
}

export default header