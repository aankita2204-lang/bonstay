import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { mockApi } from "../data/mockData";
import { validatePassword } from "../utils/validation";

const Login = () => {
  const navigate = useNavigate();
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setstate] = useState({
    userid: "",
    password: "",
  });
  //state to hold the individual validation errors of the form fields.
  const [formErrors, setFormErrors] = useState({
    userid: "",
    password: "",
  });
  //state variable used to disable the button when any given form values is invalid.
  const [valid, setValid] = useState(false);
  //state variable to capture the success Message once the Login is completed successfully.
  const [Message, setMessage] = useState("");

  const validate = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case "userid":
        // [Tutor Note]: UserId (Email) is required.
        errors.userid = value ? "" : "UserId is required";
        break;
      case "password":
        // [Tutor Note]: Password must be between 8 and 12 characters.
        errors.password = validatePassword(value);
        break;
      default:
        break;
    }
    setFormErrors(errors);

    // [Tutor Note]: Enable login button only if both fields are valid and not empty.
    const isFormValid = (name === "userid" ? value : state.userid) &&
      (name === "password" ? value : state.password) &&
      !errors.userid && !errors.password;
    setValid(isFormValid);
  };

  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */
    const { name, value } = event.target;
    setstate({ ...state, [name]: value });
    validate(name, value);
  };

  const handleSubmit = (event) => {
    // 1. This method will be invoked when user clicks on 'Login' button.
    // 2. You should prevent page reload on submit
    event.preventDefault();

    // 3.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
    // [Tutor Note]: We use query parameters to find a user with matching email and password.
    mockApi.login(state.userid, state.password)
      .then((data) => {
        // [Tutor Note]: If the response contains at least one user, it means login is successful.
        if (data.length > 0) {
          // 4. If the axios call is successful, assign the below string to successMessage state:
          //    "user logged in successfully."
          setMessage("user logged in successfully.");
          localStorage.setItem("userId", data[0].id);
          localStorage.setItem("userName", data[0].name);
          setTimeout(() => navigate("/home"), 2000);
        } else {
          setMessage("Error while logging in");
        }
      })
      .catch((err) => {
        // 5. If the axios call is not successful, assign the error message to "Error while logging in"
        setMessage("Error while logging in");
      });
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
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
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
            alt="Hotel"
            style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '500px' }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,56,92,0.8) 0%, rgba(230,30,77,0.8) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>Welcome Back!</h2>
            <p style={{ fontSize: '18px', opacity: 0.95, maxWidth: '280px' }}>Your next adventure is just a login away</p>
          </div>
        </div>

        {/* Form Side */}
        <div style={{ padding: '50px 40px' }}>
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#222', marginBottom: '8px' }}>
              Sign In
            </h3>
            <p style={{ color: '#717171', marginBottom: '32px' }}>Enter your credentials to continue</p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#222' }}>Email Address</label>
              <input
                type="text"
                name="userid"
                value={state.userid}
                onChange={change}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px',
                  transition: 'border-color 0.2s'
                }}
              />
              {formErrors.userid && <span style={{ color: '#FF385C', fontSize: '13px', marginTop: '6px', display: 'block' }}>{formErrors.userid}</span>}
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#222' }}>Password</label>
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={change}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px'
                }}
              />
              {formErrors.password && <span style={{ color: '#FF385C', fontSize: '13px', marginTop: '6px', display: 'block' }}>{formErrors.password}</span>}
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
                transition: 'all 0.3s ease',
                marginBottom: '20px'
              }}
            >
              Login
            </button>

            <div data-testid="Message" style={{
              textAlign: 'center',
              marginBottom: '20px',
              fontWeight: '600',
              color: Message.includes("successfully") ? '#008A05' : '#FF385C'
            }}>
              {Message}
            </div>

            <p style={{ textAlign: 'center', color: '#717171' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#FF385C', fontWeight: '600', textDecoration: 'none' }}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
