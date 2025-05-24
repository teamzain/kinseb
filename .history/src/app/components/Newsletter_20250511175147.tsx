import React, { useState } from 'react';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email submitted:', email);
    // Reset form
    setEmail('');
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '350px',
      background: 'linear-gradient(0deg, rgba(4, 9, 29, 0.08) 62.29%, rgba(4, 9, 29, 0.4) 100%), linear-gradient(270deg, rgba(0, 0, 0, 0.6) -0.83%, rgba(0, 0, 0, 0) 50%), url(/network-background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '100%',
        padding: '0 20px',
      }}>
        {/* Heading */}
        <h2 style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1136px',
          marginTop: '108px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: 'clamp(32px, 5vw, 56px)',
          lineHeight: '1.15',
          color: '#FFFFFF',
        }}>
          Get <span style={{ color: '#0D98BA' }}>Updates</span>
        </h2>

        {/* Subheading */}
        <h3 style={{
          position: 'relative',
          width: '100%',
          maxWidth: '650px',
          marginTop: '10px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(18px, 3vw, 35px)',
          lineHeight: '1.3',
          color: '#FFFFFF',
        }}>
          Sign up to get the latest updates and exclusive insights!
        </h3>

        {/* Email subscription form */}
        <div style={{
          position: 'relative',
          maxWidth: '425px',
          width: '100%',
          height: '73px',
          marginTop: '30px',
          background: 'rgba(4, 9, 29, 0.8)',
          border: '1px solid #7D818D',
          backdropFilter: 'blur(6px)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '20px',
            height: '100%',
            flex: 1,
          }}>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'Barlow, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '22px',
                color: '#FFFFFF',
                width: '100%',
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: '104px',
              height: '50px',
              background: '#0D98BA',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Barlow, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '150%',
              textAlign: 'center',
              color: '#FFFFFF',
              transition: 'background 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#0A7F9A'}
            onMouseOut={(e) => e.currentTarget.style.background = '#0D98BA'}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;