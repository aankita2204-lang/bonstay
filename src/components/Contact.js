import React, { useState } from 'react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, you'd send this to an API
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FF385C 0%, #764ba2 100%)',
            padding: '80px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                maxWidth: '1000px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '40px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: '50px',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                color: 'white'
            }}>
                {/* Left Side: Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>Contact Us</h1>
                    <p style={{ fontSize: '18px', opacity: 0.9, lineHeight: 1.6 }}>
                        Have questions about your booking? Our team is here to help 24/7.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ fontSize: '24px', background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '12px' }}>📍</div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '16px' }}>Address</h4>
                                <p style={{ margin: 0, opacity: 0.8 }}>123 BonStay Plaza, Bangalore, India</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ fontSize: '24px', background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '12px' }}>📞</div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '16px' }}>Phone</h4>
                                <p style={{ margin: 0, opacity: 0.8 }}>+91 1800-BONSTAY</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ fontSize: '24px', background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '12px' }}>✉️</div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '16px' }}>Email</h4>
                                <p style={{ margin: 0, opacity: 0.8 }}>support@bonstay.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
                            <h2 style={{ fontSize: '28px', fontWeight: '700' }}>Message Sent!</h2>
                            <p style={{ opacity: 0.8 }}>We'll get back to you within 24 hours.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                style={{
                                    marginTop: '20px',
                                    padding: '12px 30px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: 'white',
                                    color: '#FF385C',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                }}
                            >
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>How can we help?</label>
                                <textarea
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Tell us about your inquiry..."
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        outline: 'none',
                                        resize: 'none'
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: 'white',
                                    color: '#FF385C',
                                    fontSize: '17px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
