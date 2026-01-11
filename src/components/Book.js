import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
];

const Book = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [hotelName, setHotelName] = useState("");
  const [hotelImage, setHotelImage] = useState("");

  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
  });
  //state to hold the individual validation errors of the form fields
  const [formErrors, setFormErrors] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
  });
  // state variable used to disable the button when any of the given form values is invalid
  const [valid, setValid] = useState(false);
  //state variable to indicate whether user has given values to all the mandatory fields of the form.
  const [mandatory, setMandatory] = useState(false);
  //state variable to capture the success Message once the booking is completed successfully.
  const [Message, setMessage] = useState("");

  useEffect(() => {
    // Fetch hotel name for display
    axios.get(`http://localhost:4000/hotels/${hotelId}`)
      .then(res => {
        setHotelName(res.data.hotelName);
        setHotelImage(hotelImages[(parseInt(hotelId) - 1) % hotelImages.length]);
      })
      .catch(err => console.error(err));
  }, [hotelId]);

  const validate = (name, value) => {
    let errors = { ...formErrors };
    const today = new Date().toISOString().split('T')[0];

    switch (name) {
      case "startDate":
        // [Tutor Note]: Start date must be after today.
        errors.startDate = value > today ? "" : "the starting date should be after today's date.";
        break;
      case "endDate":
        // [Tutor Note]: End date must be greater than or equal to start date.
        errors.endDate = value >= state.startDate ? "" : "the End date should be greater than or equal to start date.";
        break;
      case "noOfPersons":
        // [Tutor Note]: Persons should be between 1 and 5.
        errors.noOfPersons = (value > 0 && value <= 5) ? "" : "the The number of persons should be greater than 0 and less than or equal to 5";
        break;
      case "noOfRooms":
        // [Tutor Note]: Rooms should be between 1 and 3.
        errors.noOfRooms = (value > 0 && value <= 3) ? "" : "the The number of rooms should be greater than 0 and less than or equal to 3";
        break;
      case "typeOfRoom":
        errors.typeOfRoom = value ? "" : "Room type is required";
        break;
      default:
        break;
    }
    setFormErrors(errors);

    const isValid = !errors.startDate && !errors.endDate && !errors.noOfPersons && !errors.noOfRooms && !errors.typeOfRoom &&
      (name === "startDate" ? value : state.startDate) &&
      (name === "endDate" ? value : state.endDate) &&
      (name === "noOfPersons" ? value : state.noOfPersons) &&
      (name === "noOfRooms" ? value : state.noOfRooms) &&
      (name === "typeOfRoom" ? value : state.typeOfRoom);
    setValid(isValid);
  };

  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    validate(name, value);
  };

  const handleSubmit = (event) => {
    // 1. This method will be invoked when user clicks on 'Book' button.
    // 2. You should prevent page reload on submit
    event.preventDefault();

    // 3. check whether all the form fields are entered. If any of the form fields is not entered set the mandatory state variable to true.
    if (!state.startDate || !state.endDate || !state.noOfPersons || !state.noOfRooms || !state.typeOfRoom) {
      setMandatory(true);
      return;
    }
    setMandatory(false);

    // 4.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/bookings/" and pass the appropriate state as data to the axios call
    const bookingData = {
      ...state,
      hotelId: parseInt(hotelId),
      hotelName: hotelName,
      userId: parseInt(userId)
    };

    axios.post("http://localhost:4000/bookings/", bookingData)
      .then((res) => {
        // 5. If the axios call is successful, assign the below string to successMessage state:
        //   "Booking is successfully created with bookingId: " + <id>
        setMessage("Booking is successfully created with bookingId: " + res.data.id);
        setTimeout(() => navigate("/bookings"), 2000);
      })
      .catch((err) => {
        // 6. If the axios call is not successful, assign the error message to "Something went wrong"
        setMessage("Something went wrong");
      });
  };
  return (
    <>
      <div className="booking-page" style={{
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            background: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
          }}>
            {/* Hotel Image Side */}
            <div style={{ position: 'relative', minHeight: '600px' }}>
              <img
                src={hotelImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"}
                alt={hotelName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '40px 30px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{hotelName}</h2>
                <p style={{ opacity: 0.9, fontSize: '16px' }}>🏨 Premium accommodation awaits you</p>
              </div>
            </div>

            {/* Form Side */}
            <div style={{ padding: '40px 40px 40px 20px' }}>
              <form onSubmit={handleSubmit}>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#222',
                  marginBottom: '8px'
                }}>
                  Book Your Stay
                </h3>
                <p style={{ color: '#717171', marginBottom: '32px' }}>Fill in the details to reserve your room</p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#222' }}>Check-in Date</label>
                  <input
                    type="Date"
                    className="form-control"
                    name="startDate"
                    value={state.startDate}
                    onChange={change}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      fontSize: '16px',
                      transition: 'border-color 0.2s'
                    }}
                  />
                  {formErrors.startDate && <span className="text-danger" style={{ fontSize: '13px', marginTop: '4px', display: 'block' }}>{formErrors.startDate}</span>}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#222' }}>Check-out Date</label>
                  <input
                    type="Date"
                    className="form-control"
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
                  {formErrors.endDate && <span className="text-danger" style={{ fontSize: '13px', marginTop: '4px', display: 'block' }}>{formErrors.endDate}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#222' }}>Guests</label>
                    <input
                      type="number"
                      className="form-control"
                      name="noOfPersons"
                      value={state.noOfPersons}
                      onChange={change}
                      placeholder="1-5"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: '2px solid #e0e0e0',
                        fontSize: '16px'
                      }}
                    />
                    {formErrors.noOfPersons && <span className="text-danger" style={{ fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.noOfPersons}</span>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#222' }}>Rooms</label>
                    <input
                      type="number"
                      className="form-control"
                      name="noOfRooms"
                      value={state.noOfRooms}
                      onChange={change}
                      placeholder="1-3"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: '2px solid #e0e0e0',
                        fontSize: '16px'
                      }}
                    />
                    {formErrors.noOfRooms && <span className="text-danger" style={{ fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.noOfRooms}</span>}
                  </div>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#222' }}>Room Type</label>
                  <select
                    name="typeOfRoom"
                    className="form-control"
                    value={state.typeOfRoom}
                    onChange={change}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      fontSize: '16px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select room type</option>
                    <option value="AC">AC Room ❄️</option>
                    <option value="Non AC">Non AC Room 🌿</option>
                  </select>
                  {formErrors.typeOfRoom && <span className="text-danger" style={{ fontSize: '13px', marginTop: '4px', display: 'block' }}>{formErrors.typeOfRoom}</span>}
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
                  Confirm Booking
                </button>

                {mandatory && <div data-testid="mandatory" className="text-danger" style={{ marginTop: '16px', textAlign: 'center' }}>Please fill in all fields</div>}
                <div data-testid="Message" className={Message.includes("successfully") ? "text-success" : "text-danger"} style={{ marginTop: '16px', textAlign: 'center', fontWeight: '600' }}>
                  {Message}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
