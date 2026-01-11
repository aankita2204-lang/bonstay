import React from 'react';

const Privacy = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8f9fa',
            padding: '100px 20px',
            fontFamily: "'Inter', sans-serif",
            color: '#222'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'white',
                padding: '60px',
                borderRadius: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '30px', color: '#222' }}>Privacy Policy</h1>
                <p style={{ color: '#717171', marginBottom: '40px' }}>Last Updated: January 11, 2026</p>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '15px' }}>1. Information We Collect</h2>
                    <p style={{ lineHeight: 1.7, color: '#484848' }}>
                        We collect information you provide directly to us when you create an account, make a booking, or communicate with us. This may include your name, email address, phone number, and payment information.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '15px' }}>2. How We Use Your Information</h2>
                    <p style={{ lineHeight: 1.7, color: '#484848' }}>
                        To provide and improve our services, we use your information to:
                        <ul style={{ marginTop: '10px' }}>
                            <li>Process and confirm your hotel bookings.</li>
                            <li>Send you administrative messages and security alerts.</li>
                            <li>Provide customer support.</li>
                            <li>Personalize your experience on BonStay.</li>
                        </ul>
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '15px' }}>3. Data Security</h2>
                    <p style={{ lineHeight: 1.7, color: '#484848' }}>
                        We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronice storage is 100% secure.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '15px' }}>4. Cookies</h2>
                    <p style={{ lineHeight: 1.7, color: '#484848' }}>
                        We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '15px' }}>5. Contact Us</h2>
                    <p style={{ lineHeight: 1.7, color: '#484848' }}>
                        If there are any questions regarding this privacy policy, you may contact us using the information on our Contact Us page.
                    </p>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '40px 0' }} />

                <p style={{ textAlign: 'center', color: '#717171', fontSize: '14px' }}>
                    © 2026 BonStay Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Privacy;
