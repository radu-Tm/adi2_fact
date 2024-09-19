// /src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Pagina Principală</Link></li>
          <li><Link to="/admin">Administrare</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
