import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hotels.css";
import HotelImage from "./HotelImage";
import { mockApi } from "../data/mockData";

// Utility function to optimize Unsplash URLs
const getOptimizedImageUrl = (url) => {
  if (!url) return "";
  if (url.includes("unsplash.com") && !url.includes("?")) {
    return `${url}?w=800&q=80`;
  }
  return url;
};

const Hotels = () => {
  const navigate = useNavigate();
  const [Hotels, sethotel] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Using mock API instead of localhost
    mockApi.getHotels()
      .then((data) => {
        sethotel(data);
      })
      .catch((err) => {
        setError("Something went Wrong");
      });
  }, []);

  return (
    <div className="hotels-page">
      <div className="hotels-header">
        <h1>Explore stays</h1>
        <p>Find the perfect place for your next adventure</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="hotels-grid">
        {Hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <div className="hotel-image">
              <HotelImage
                src={getOptimizedImageUrl(hotel.imageUrl)}
                alt={hotel.hotelName}
              />
              <div className="hotel-badge">
                <span>⭐ 4.{Math.floor(Math.random() * 3) + 7}</span>
              </div>
              <button className="heart-btn">♡</button>
            </div>

            <div className="hotel-content">
              <div className="hotel-header">
                <h3>{hotel.hotelName}</h3>
                <span className="hotel-city">📍 {hotel.city}</span>
              </div>

              <div className="hotel-amenities">
                {hotel.amenities.split(',').slice(0, 3).map((amenity, i) => (
                  <span key={i} className="amenity-tag">{amenity.trim()}</span>
                ))}
              </div>

              <p className="hotel-address">{hotel.address}</p>

              <div className="hotel-footer">
                <div className="hotel-price">
                  <span className="price">₹{(Math.floor(Math.random() * 5) + 2) * 1000}</span>
                  <span className="per-night">/ night</span>
                </div>
                <div className="hotel-contact">
                  📞 {hotel.phoneNo}
                </div>
              </div>

              <div className="hotel-actions">
                <button
                  className="btn-book"
                  onClick={() => navigate(`/book/${hotel.id}`)}
                >
                  Book Now
                </button>
                <button
                  className="btn-review"
                  onClick={() => navigate(`/addreview/${hotel.id}`)}
                >
                  ✍️
                </button>
                <button
                  className="btn-view"
                  onClick={() => navigate(`/showreview/${hotel.id}`)}
                >
                  💬
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
