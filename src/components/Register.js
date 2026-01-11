import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { mockApi } from "../data/mockData";
import { validateName, validatePhone, validateEmail, validatePassword } from "../utils/validation";

const Register = () => {
  const navigate = useNavigate();
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setState] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  //state to hold the individual validation errors of the form fields.
  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  //state variable used to disable the button when any given form values is invalid.
  const [valid, setValid] = useState(false);
  //state variable to indicate whether user has given values to all the mandatory fields of the form.
  const [mandatory, setMandatory] = useState(false);
  //state variable to capture the success Message once the registration is completed successfully.
  const [successMessage, setSuccessMessage] = useState("");

  const validate = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case "name":
        // [Tutor Note]: Name must be at least 3 characters.
        errors.name = validateName(value);
        break;
      case "address":
        // [Tutor Note]: Address is a required field.
        errors.address = value ? "" : "address is a required field.";
        break;
      case "phoneNo":
        // [Tutor Note]: Phone number must be exactly 10 digits.
        errors.phoneNo = validatePhone(value);
        break;
      case "email":
        // [Tutor Note]: Email must follow a standard pattern.
        errors.email = validateEmail(value);
        break;
      case "password":
        // [Tutor Note]: Password must be between 8 and 12 characters.
        errors.password = validatePassword(value);
        break;
      default:
        break;
    }
    setFormErrors(errors);

    // [Tutor Note]: Button will be enabled only if no validation errors exist.
    const isValid = !errors.name && !errors.address && !errors.phoneNo && !errors.email && !errors.password &&
      state.name && state.address && state.phoneNo && state.email && state.password;
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
    // 1. This method will be invoked when user clicks on 'Register' button.
    // 2. You should prevent page reload on submit
    event.preventDefault();

    // 3. check whether all the form fields are entered. If any of the form fields is not entered set the mandatory state variable to true.
    if (!state.name || !state.address || !state.phoneNo || !state.email || !state.password) {
      setMandatory(true);
      return;
    }
    setMandatory(false);

    // 4.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
    mockApi.register(state)
      .then((data) => {
        // 5. If the axios call is successful, assign the below string to successMessage state:
        //    "User registered successfully with the id "+ <id>
        setSuccessMessage("User registered successfully with the id " + data.id);
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        // 6. If the axios call is not successful, assign the error message to "Error while registering user"
        setSuccessMessage("Error while registering user");
      });
  };
  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '1000px',
        width: '100%',
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)'
      }}>
        {/* Image Side */}
        <div style={{ position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80"
            alt="Hotel"
            style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '650px' }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,56,92,0.85) 0%, rgba(215,4,102,0.85) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>Join BonStay</h2>
            <p style={{ fontSize: '18px', opacity: 0.95, maxWidth: '280px' }}>Create an account and start exploring amazing stays</p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', display: 'block' }}>500+</span>
                <span style={{ fontSize: '14px', opacity: 0.9 }}>Hotels</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', display: 'block' }}>10K+</span>
                <span style={{ fontSize: '14px', opacity: 0.9 }}>Guests</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div style={{ padding: '40px' }}>
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#222', marginBottom: '8px' }}>
              Create Account
            </h3>
            <p style={{ color: '#717171', marginBottom: '28px' }}>Fill in your details to get started</p>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#222', fontSize: '14px' }}>Full Name</label>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={change}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '2px solid #e0e0e0',
                  fontSize: '15px'
                }}
              />
              {formErrors.name && <span style={{ color: '#FF385C', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.name}</span>}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#222', fontSize: '14px' }}>Address</label>
              <input
                type="text"
                name="address"
                value={state.address}
                onChange={change}
                placeholder="Your city, state"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '2px solid #e0e0e0',
                  fontSize: '15px'
                }}
              />
              {formErrors.address && <span style={{ color: '#FF385C', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.address}</span>}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#222', fontSize: '14px' }}>Phone Number</label>
              <input
                type="text"
                name="phoneNo"
                value={state.phoneNo}
                onChange={change}
                placeholder="10-digit number"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '2px solid #e0e0e0',
                  fontSize: '15px'
                }}
              />
              {formErrors.phoneNo && <span style={{ color: '#FF385C', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.phoneNo}</span>}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#222', fontSize: '14px' }}>Email</label>
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={change}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '2px solid #e0e0e0',
                  fontSize: '15px'
                }}
              />
              {formErrors.email && <span style={{ color: '#FF385C', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.email}</span>}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#222', fontSize: '14px' }}>Password</label>
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={change}
                placeholder="8-12 characters"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '2px solid #e0e0e0',
                  fontSize: '15px'
                }}
              />
              {formErrors.password && <span style={{ color: '#FF385C', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.password}</span>}
            </div>

            <button
              type="submit"
              disabled={!valid}
              style={{
                width: '100%',
                padding: '14px',
                background: valid ? 'linear-gradient(to right, #FF385C, #E61E4D)' : '#ddd',
                color: valid ? 'white' : '#999',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: valid ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                marginBottom: '16px'
              }}
            >
              Create Account
            </button>

            {mandatory && <div data-testid="mandatory" style={{ color: '#FF385C', textAlign: 'center', marginBottom: '12px', fontSize: '14px' }}>Please fill in all fields</div>}
            <div data-testid="successMessage" style={{
              textAlign: 'center',
              marginBottom: '16px',
              fontWeight: '600',
              color: successMessage.includes("successfully") ? '#008A05' : '#FF385C'
            }}>
              {successMessage}
            </div>

            <p style={{ textAlign: 'center', color: '#717171', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#FF385C', fontWeight: '600', textDecoration: 'none' }}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
