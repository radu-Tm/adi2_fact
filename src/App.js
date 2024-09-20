import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import PaginaPrincipala from './components/PaginaPrincipala';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';

import Incasare from './components/Incasare';
import './App.css';
import { getCookie } from './utils/cookies';

console.log(getCookie('suprafataTotala'));

function Navbar() {
  const pageLocation = useLocation();
  const isHomePage = pageLocation.pathname === '/';
  const isAdminPage = pageLocation.pathname === '/admin';
  const isLoginPage = pageLocation.pathname === '/login';
  const isIncasare = pageLocation.pathname === '/incasare';

  return (
    <header>
      <nav>
        {!isHomePage && (
          <Link to="/">
            <img src="/home.webp" alt="Home" />
          </Link>
        )}
        {(!isAdminPage && !isLoginPage) && (
          <Link to="/login">
            <img src="/admin.webp" alt="Admin" />
          </Link>
        )}
		 {!isIncasare && (
		 <Link to="/incasare">
            <img src="/incasare.webp" alt="Incasare" />
          </Link>
		 )}
      </nav>
    </header>
	
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PaginaPrincipala />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
		
		 <Route path="/incasare" element={<Incasare />} />
      </Routes>
    </Router>
  );
}

export default App;
