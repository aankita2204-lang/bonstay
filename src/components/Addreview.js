import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockApi } from "../data/mockData";

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
];

const Addreview = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotelName, setHotelName] = useState("");

  const [state, setState] = useState({
    Reviews: "",
  });
  const [formErrors, setFormErrors] = useState({
    Reviews: "",
  });
  const [Message, setMessage] = useState("");
  const [mandatory, setMandatory] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    mockApi.getHotelById(hotelId)
      .then(data => setHotelName(data.hotelName))
      .catch(err => console.error(err));
  }, [hotelId]);

  const validate = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case "Reviews":
        errors.Reviews = value ? "" : "Review is required";
        break;
      default:
        break;
    }
    setFormErrors(errors);
    setValid(value && !errors.Reviews);
  };

  const change = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    validate(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!state.Reviews) {
      setMandatory(true);
      return;
    }
    setMandatory(false);

    mockApi.addReview(hotelId, state.Reviews)
      .then(() => {
        setMessage("Review is successfully added.");
        setTimeout(() => navigate("/hotels"), 2000);
      })
      .catch(() => {
        setMessage("Something went wrong");
      });
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)'
      }}>
        {/* Image Side */}
        <div style={{ position: 'relative' }}>
          <img
            src={hotelImages[(parseInt(hotelId) - 1) % hotelImages.length]}
            alt={hotelName}
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
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>{hotelName}</h3>
            <p style={{ opacity: 0.9 }}>Share your experience with others</p>
          </div>
        </div>

        {/* Form Side */}
        <div style={{ padding: '40px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>✍️</div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#222', marginBottom: '8px' }}>
                Write a Review
              </h3>
              <p style={{ color: '#717171' }}>Your feedback helps other travelers</p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '10px', color: '#222' }}>
                Your Review
              </label>
              <textarea
                name="Reviews"
                rows="6"
                maxLength="100"
                value={state.Reviews}
                onChange={change}
                placeholder="Tell us about your stay... What did you love? Any tips for future guests?"
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  fontSize: '15px',
                  resize: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                {formErrors.Reviews && <span style={{ color: '#FF385C', fontSize: '13px' }}>{formErrors.Reviews}</span>}
                <span style={{ color: '#717171', fontSize: '13px', marginLeft: 'auto' }}>{state.Reviews.length}/100</span>
              </div>
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
              Submit Review
            </button>

            {mandatory && <div data-testid="mandatory" style={{ color: '#FF385C', textAlign: 'center', marginTop: '16px' }}>Please write your review</div>}
            <div data-testid="Message" style={{
              textAlign: 'center',
              marginTop: '16px',
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

export default Addreview;
