import React from 'react';
import Image from 'next/image';

const WebDevelopmentSection: React.FC = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '750px',
      background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Website mockups image */}
      <div style={{
        position: 'absolute',
        width: '632.23px',
        height: '422px',
        left: '0px',
        top: '159px',
        borderRadius: '10px',
        background: 'url(/website-mockups.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      {/* H2 Title */}
      <h2 style={{
        position: 'absolute',
        width: '504px',
        height: '64px',
        left: '713px',
        top: '117px',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '56px',
        lineHeight: '64px',
        textAlign: 'center',
        letterSpacing: '-0.03em',
        color: '#FFFFFF'
      }}>
        Web Development
      </h2>

      {/* Group 14 - Subtitle and Description */}
      <div style={{
        position: 'absolute',
        width: '653px',
        height: '209px',
        left: '713px',
        top: '228px'
      }}>
        {/* Subtitle */}
        <h3 style={{
          width: '653px',
          height: '70px',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '28px',
          lineHeight: '35px',
          color: '#0D98BA',
          margin: 0
        }}>
          Developing High-Performance Websites That Scale With You
        </h3>

        {/* Description */}
        <p style={{
          width: '549px',
          height: '120px',
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '30px',
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          marginTop: '19px'
        }}>
          From frontend finesse to powerful backend systems, we build secure, scalable websites tailored to your business needs. Be it WordPress, Shopify, or custom development, our solutions are as reliable as they are refined.
        </p>
      </div>

      {/* Button */}
      <button style={{
        position: 'absolute',
        width: '235px',
        height: '45px',
        left: '713px',
        top: '484px',
        background: '#0D98BA',
        border: '2px solid #0D98BA',
        borderRadius: '6px',
        cursor: 'pointer',
        padding: 0,
        overflow: 'hidden'
      }}>
        {/* Button Text */}
        <span style={{
          display: 'block',
          width: '100%',
          height: '100%',
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '150%',
          textAlign: 'center',
          color: '#04091D',
          paddingTop: '10px'
        }}>
          See Development Services
        </span>
      </button>
    </div>
  );
};

export default WebDevelopmentSection;