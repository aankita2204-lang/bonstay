import { useState, useEffect } from "react";
import { HashRouter, Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Hotels from "./components/Hotels";
import Bookings from "./components/Bookings";
import Book from "./components/Book";
import Addreview from "./components/Addreview";
import Showreview from "./components/Showreview";
import Reschedule from "./components/Reschedule";
import Contact from "./components/Contact";
import Privacy from "./components/Privacy";
import AuthRequired from "./components/AuthRequired";

const Footer = () => {
  return (
    <footer style={{
      background: 'white',
      padding: '40px 20px',
      borderTop: '1px solid #eee',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/contact" style={{ margin: '0 15px', color: '#717171', textDecoration: 'none', fontWeight: '500' }}>Contact Us</Link>
        <Link to="/privacy" style={{ margin: '0 15px', color: '#717171', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</Link>
      </div>
      <p style={{ color: '#b0b0b0', fontSize: '14px' }}>© 2026 BonStay. Designed with ❤️ for travelers.</p>
    </footer>
  );
};

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      data-testid="nav-bar"
      className={`navbar navbar-expand-lg navbar-light bg-custom ${isMenuOpen ? 'menu-open' : ''}`}
    >
      <Link className="navbar-brands" to="/home">
        BONSTAY
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <ul className={`navbar-nav ${isMenuOpen ? 'show' : ''}`}>
        <li className="nav-item">
          <Link className="nav-link" to="/home" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hotels" onClick={() => setIsMenuOpen(false)}>
            Hotels
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bookings" onClick={() => setIsMenuOpen(false)}>
            Bookings
          </Link>
        </li>
        <li className="nav-item">
          {isLoggedIn ? (
            <Link className="nav-link" to="/login" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link className="nav-link" to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <HashRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/bookings" element={<AuthRequired><Bookings /></AuthRequired>} />
            <Route path="/book/:hotelId" element={<AuthRequired><Book /></AuthRequired>} />
            <Route path="/addreview/:hotelId" element={<AuthRequired><Addreview /></AuthRequired>} />
            <Route path="/showreview/:hotelId" element={<Showreview />} />
            <Route path="/reschedule/:bookingId" element={<AuthRequired><Reschedule /></AuthRequired>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
