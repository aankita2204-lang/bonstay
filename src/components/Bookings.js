import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../data/mockData";

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
];

const Bookings = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  const [errMsg, setErrMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    if (userId) {
      mockApi.getBookingsByUserId(userId)
        .then((data) => {
          setBookings(data);
        })
        .catch(() => {
          setErrMessage("Something went Wrong");
        });
    }
  }, [userId, deleteSuccess]);

  const handleAction = (id) => {
    mockApi.deleteBooking(id)
      .then(() => {
        alert("The booking for Booking ID :" + id + " is deleted");
        setDeleteSuccess(id);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#222', marginBottom: '8px' }}>My Bookings</h1>
          <p style={{ color: '#717171', fontSize: '16px' }}>Manage your upcoming stays</p>
        </div>

        {errMsg && <div className="alert alert-danger" style={{ borderRadius: '12px', marginBottom: '24px' }}>{errMsg}</div>}

        {bookings.length === 0 && !errMsg && (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '60px 40px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🏨</div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#222', marginBottom: '12px' }}>No bookings yet</h3>
            <p style={{ color: '#717171', marginBottom: '24px' }}>Start exploring and book your perfect stay!</p>
            <button
              onClick={() => navigate('/hotels')}
              style={{
                background: 'linear-gradient(to right, #FF385C, #E61E4D)',
                color: 'white',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Browse Hotels
            </button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {bookings.map((booking) => (
            <div key={booking.id} style={{
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease'
            }}>
              {/* Hotel Image */}
              <div style={{ position: 'relative', height: '160px' }}>
                <img
                  src={hotelImages[(parseInt(booking.hotelId) - 1) % hotelImages.length]}
                  alt={booking.hotelName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                  ID: {booking.id}
                </div>
              </div>

              {/* Booking Details */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '16px' }}>
                  {booking.hotelName}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#717171', display: 'block' }}>Check-in</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#222' }}>{booking.startDate}</span>
                  </div>
                  <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#717171', display: 'block' }}>Check-out</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#222' }}>{booking.endDate}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '14px', color: '#717171' }}>
                  <span>👥 {booking.noOfPersons} guests</span>
                  <span>🚪 {booking.noOfRooms} rooms</span>
                  <span>{booking.typeOfRoom === 'AC' ? '❄️' : '🌿'} {booking.typeOfRoom}</span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    data-testid="Reschedule-button"
                    onClick={() => navigate(`/reschedule/${booking.id}`)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#222',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Reschedule
                  </button>
                  <button
                    data-testid="delete-button"
                    onClick={() => handleAction(booking.id)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(to right, #FF385C, #E61E4D)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
