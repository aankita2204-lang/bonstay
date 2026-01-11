import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockApi } from "../data/mockData";

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
];

const Showreview = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    mockApi.getHotelById(hotelId)
      .then((data) => {
        setHotel(data);
      })
      .catch(() => {
        setError("Something went Wrong");
      });
  }, [hotelId]);

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {error && <div className="alert alert-danger" style={{ borderRadius: '12px' }}>{error}</div>}

        {hotel && (
          <div style={{
            background: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
          }}>
            {/* Hotel Header with Image */}
            <div style={{ position: 'relative', height: '250px' }}>
              <img
                src={hotelImages[(parseInt(hotelId) - 1) % hotelImages.length]}
                alt={hotel.hotelName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '30px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>{hotel.hotelName}</h2>
                <p style={{ opacity: 0.9 }}>📍 {hotel.city}</p>
              </div>
            </div>

            {/* Reviews Section */}
            <div style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#222', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>💬</span> Guest Reviews
                {hotel.reviews && hotel.reviews.length > 0 && (
                  <span style={{
                    background: '#FF385C',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}>
                    {hotel.reviews.length}
                  </span>
                )}
              </h3>

              {hotel.reviews && hotel.reviews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {hotel.reviews.map((review, index) => (
                    <div key={index} style={{
                      background: '#f8f9fa',
                      padding: '20px',
                      borderRadius: '16px',
                      borderLeft: '4px solid #FF385C'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #FF385C, #E61E4D)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: '700'
                        }}>
                          {String.fromCharCode(65 + (index % 26))}
                        </div>
                        <div>
                          <span style={{ fontWeight: '600', color: '#222' }}>Guest {index + 1}</span>
                          <div style={{ fontSize: '12px', color: '#717171' }}>⭐⭐⭐⭐⭐</div>
                        </div>
                      </div>
                      <p style={{ color: '#444', lineHeight: '1.6', margin: 0 }}>"{review}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
                  <p style={{ color: '#717171', fontSize: '16px' }}>No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Showreview;
