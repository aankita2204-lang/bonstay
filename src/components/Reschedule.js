import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockApi } from "../data/mockData";
import { validateStartDate, validateEndDate } from "../utils/validation";

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
];

const Reschedule = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  const [state, setState] = useState({
    startDate: "",
    endDate: "",
  });
  //state to hold the individual validation errors of the form fields
  const [formErrors, setFormErrors] = useState({
    startDate: "",
    endDate: "",
  });
  // state variable used to disable the button when any of the given form values is invalid
  const [valid, setValid] = useState(false);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    mockApi.getBookingById(bookingId)
      .then(data => {
        setBooking(data);
        setState({
          startDate: data.startDate,
          endDate: data.endDate
        });
        // Initial validation of pre-populated data
        const errors = {
          startDate: validateStartDate(data.startDate),
          endDate: validateEndDate(data.endDate, data.startDate)
        };
        setFormErrors(errors);
        setValid(!errors.startDate && !errors.endDate);
      })
      .catch(err => console.error(err));
  }, [bookingId]);

  const validate = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case "startDate":
        errors.startDate = validateStartDate(value);
        break;
      case "endDate":
        errors.endDate = validateEndDate(value, state.startDate);
        break;
      default:
        break;
    }
    setFormErrors(errors);

    const isValid = !errors.startDate && !errors.endDate &&
      (name === "startDate" ? value : state.startDate) &&
      (name === "endDate" ? value : state.endDate);
    setValid(isValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    mockApi.updateBooking(bookingId, state)
      .then(() => {
        setMessage("Reschedule is successfully done");
        setTimeout(() => navigate("/bookings"), 2000);
      })
      .catch(() => {
        setMessage("Something went wrong");
      });
  };

  const change = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    validate(name, value);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '900px',
        width: '100%',
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
      }}>
        {/* Image Side */}
        <div style={{ position: 'relative' }}>
          <img
            src={booking ? hotelImages[(parseInt(booking.hotelId) - 1) % hotelImages.length] : hotelImages[0]}
            alt="Hotel"
            style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '450px' }}
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
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
              {booking?.hotelName || 'Loading...'}
            </h3>
            <p style={{ opacity: 0.9 }}>📅 Modify your booking dates</p>
          </div>
        </div>

        {/* Form Side */}
        <div style={{ padding: '50px 40px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📆</div>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#222', marginBottom: '8px' }}>
                Reschedule Booking
              </h3>
              <p style={{ color: '#717171' }}>Change your check-in and check-out dates</p>
            </div>

            {booking && (
              <div style={{
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#717171', fontSize: '14px' }}>Booking ID</span>
                <span style={{ fontWeight: '700', color: '#222' }}>#{bookingId}</span>
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '10px', color: '#222' }}>
                New Check-in Date
              </label>
              <input
                type="Date"
                name="startDate"
                value={state.startDate}
                onChange={change}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '10px', color: '#222' }}>
                New Check-out Date
              </label>
              <input
                type="Date"
                name="endDate"
                value={state.endDate}
                onChange={change}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!valid}
              style={{
                width: '100%',
                padding: '16px',
                background: valid ? 'linear-gradient(to right, #FF385C, #E61E4D)' : '#ddd',
                color: valid ? 'white' : '#999',
                border: 'none',
                borderRadius: '12px',
                fontSize: '17px',
                fontWeight: '700',
                cursor: valid ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease'
              }}
            >
              Confirm Reschedule
            </button>

            <div data-testid="Message" style={{
              textAlign: 'center',
              marginTop: '20px',
              fontWeight: '600',
              color: Message.includes("successfully") ? '#008A05' : '#FF385C'
            }}>
              {Message}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reschedule;
