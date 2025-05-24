import React from 'react';

const SEOSection = () => {
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
        SEO Services
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
        Boosting Visibility & Rankings Through Data-Driven Strategy
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
        From keyword research to technical optimization, our SEO process combines analytics with audience intent. Whether you're starting fresh or enhancing existing rankings, we deliver strategies that improve visibility, drive organic traffic, and maximize ROI.
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
          Explore SEO Services
        </div>
      </div>

      {/* SEO Analytics Image */}
      <div style={{
        position: 'absolute',
        width: '632.23px',
        height: '422px',
        left: '755px',
        top: '159px',
        borderRadius: '10px',
        backgroundImage: 'url(/images/about-3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      </div>
    </div>
  );
};

export default SEOSection;