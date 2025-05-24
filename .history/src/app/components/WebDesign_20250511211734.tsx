import React from 'react';

const WebDesignSection = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '750px',
      background: 'linear-gradient(180deg, #0D98BA -223.2%, #04091D 100%)',
      overflow: 'hidden',
    }}>
      {/* H2 Title */}
      <div style={{
        position: 'absolute',
        width: '324px',
        height: '64px',
        left: '74px',
        top: '117px',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '56px',
        lineHeight: '64px',
        letterSpacing: '-0.03em',
        color: '#FFFFFF',
      }}>
        Web Design
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'absolute',
        width: '653px',
        height: '70px',
        left: '74px',
        top: '228px',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '28px',
        lineHeight: '35px',
        color: '#0D98BA',
      }}>
        Crafting Digital Masterpieces Through Strategic Design
      </div>

      {/* Description Text */}
      <div style={{
        position: 'absolute',
        width: '549px',
        height: '120px',
        left: '74px',
        top: '317px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '30px',
        letterSpacing: '-0.03em',
        color: '#FFFFFF',
      }}>
        From branding to UI/UX, our design process blends aesthetic excellence with user intent. Whether you're building from scratch or refining your existing identity, we deliver visuals that connect, convert, and endure.
      </div>

      {/* Button */}
      <div style={{
        position: 'absolute',
        width: '238px',
        height: '45px',
        left: '74px',
        top: '484px',
        background: '#0D98BA',
        border: '2px solid #0D98BA',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}>
        <div style={{
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '150%',
          textAlign: 'center',
          color: '#04091D',
        }}>
          Explore Web Design Services
        </div>
      </div>

      {/* Website Mockups Image */}
      <div style={{
        position: 'absolute',
        width: '632.23px',
        height: '422px',
        left: '755px',
        top: '159px',
        borderRadius: '10px',
        backgroundImage: 'url(/website-mockups.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      </div>
    </div>
  );
};

export default WebDesignSection;