import { useState, useEffect } from "react";
import { BrowserRouter, Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import AuthRequired from "./components/AuthRequired";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
  };

  return (
    <nav
      data-testid="nav-bar"
      className="navbar navbar-expand-lg navbar-light bg-custom"
    >
      <Link className="nav-link" style={{ fontFamily: "cursive" }} to="/home">
        BONSTAY
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hotels">
            Hotels
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bookings">
            Bookings
          </Link>
        </li>
        <li className="nav-item">
          {isLoggedIn ? (
            <Link className="nav-link" to="/login" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link className="nav-link" to="/login">
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
    <BrowserRouter>
      <div>
        <Navigation />
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
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
