import { useNavigate } from "react-router-dom";
import "./Home.css";

const featuredDestinations = [
  { name: "Bangalore", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80", hotels: "120+ stays" },
  { name: "Kochi", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80", hotels: "85+ stays" },
  { name: "Chennai", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80", hotels: "95+ stays" },
  { name: "Mumbai", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80", hotels: "200+ stays" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80" alt="Luxury Hotel" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="welcome-title">Find your next stay</h1>
          <p className="card-text">
            Search deals on hotels, homes, and much more...
          </p>
          <div className="search-bar">
            <input type="text" placeholder="Where are you going?" />
            <button className="search-btn" onClick={() => navigate('/hotels')}>
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="destinations-section">
        <h2 className="section-title">Explore India</h2>
        <p className="section-subtitle">These popular destinations have a lot to offer</p>
        <div className="destinations-grid">
          {featuredDestinations.map((dest, index) => (
            <div key={index} className="destination-card" onClick={() => navigate('/hotels')}>
              <img src={dest.img} alt={dest.name} />
              <div className="destination-info">
                <h3>{dest.name}</h3>
                <span>{dest.hotels}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-item" onClick={() => navigate('/hotels')}>
          <div className="feature-icon">🏨</div>
          <span className="feature-text">Premium Hotels</span>
          <span className="feature-desc">Handpicked luxury stays for every budget</span>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💰</div>
          <span className="feature-text">Best Prices</span>
          <span className="feature-desc">Guaranteed lowest rates or we'll match it</span>
        </div>
        <div className="feature-item" onClick={() => navigate('/hotels')}>
          <div className="feature-icon">⚡</div>
          <span className="feature-text">Instant Booking</span>
          <span className="feature-desc">Book in seconds, no waiting required</span>
        </div>
        <div className="feature-item">
          <div className="feature-icon">⭐</div>
          <span className="feature-text">Verified Reviews</span>
          <span className="feature-desc">Real reviews from real travelers</span>
        </div>
      </div>

      {/* Property Types */}
      <div className="property-types-section">
        <h2 className="section-title">Browse by property type</h2>
        <div className="property-grid">
          <div className="property-card" onClick={() => navigate('/hotels')}>
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80" alt="Hotels" />
            <h4>Hotels</h4>
            <span>500+ properties</span>
          </div>
          <div className="property-card" onClick={() => navigate('/hotels')}>
            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80" alt="Apartments" />
            <h4>Apartments</h4>
            <span>320+ properties</span>
          </div>
          <div className="property-card" onClick={() => navigate('/hotels')}>
            <img src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=500&q=80" alt="Resorts" />
            <h4>Resorts</h4>
            <span>180+ properties</span>
          </div>
          <div className="property-card" onClick={() => navigate('/hotels')}>
            <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&q=80" alt="Villas" />
            <h4>Villas</h4>
            <span>95+ properties</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Hotels Worldwide</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Happy Guests</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.9</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-bg">
          <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80" alt="Book Now" />
          <div className="cta-overlay"></div>
        </div>
        <div className="cta-content">
          <h2 className="cta-title">Ready to explore?</h2>
          <p className="cta-text">Join thousands of travelers who trust BonStay</p>
          <button className="cta-btn" onClick={() => navigate('/hotels')}>
            Browse Hotels
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
