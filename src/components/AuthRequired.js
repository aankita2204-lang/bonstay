import { useNavigate, useLocation } from "react-router-dom";

const AuthRequired = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    if (!userId) {
        return (
            <div style={{
                minHeight: 'calc(100vh - 70px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                padding: '40px 20px'
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '50px 40px',
                    textAlign: 'center',
                    maxWidth: '450px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
                }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔐</div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#222', marginBottom: '12px' }}>
                        Login Required
                    </h2>
                    <p style={{ color: '#717171', marginBottom: '28px', lineHeight: '1.6' }}>
                        Please login or sign up to access this feature
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button
                            onClick={() => navigate('/login', { state: { from: location } })}
                            style={{
                                padding: '14px 32px',
                                background: 'linear-gradient(to right, #FF385C, #E61E4D)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register', { state: { from: location } })}
                            style={{
                                padding: '14px 32px',
                                background: '#222',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return children;
};

export default AuthRequired;
