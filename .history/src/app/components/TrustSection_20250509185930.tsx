// TrustSection.jsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

const TrustSection = () => {
  return (
    <>
      <Head>
        {/* Import Poppins and Lato fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&family=Lato:wght@600&display=swap" rel="stylesheet" />
      </Head>
      
      <div style={{
        position: 'relative',
        width: '100%',
        height: '828px',
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        padding: '0',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Main Heading */}
        <h2 style={{
          position: 'absolute',
          width: '699px',
          height: '128px',
          left: '50%',
          top: '85px',
          transform: 'translateX(-50%)',
          fontFamily: 'Poppins, sans-serif',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '56px',
          lineHeight: '64px',
          textAlign: 'center',
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          margin: '0'
        }}>
          Why Clients <span style={{ color: '#0D98BA' }}>Trust</span><br />
          Kinseb Web Development
        </h2>

        {/* Navigation Tabs */}
        <div style={{
          position: 'absolute',
          width: '1260px',
          left: '50%',
          top: '264px',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {/* Custom Web Design - Active Tab */}
          <div style={{
            position: 'relative',
            width: '242px',
            height: '92px',
            background: 'rgba(13, 152, 186, 0.15)',
            borderRadius: '10px 10px 0px 0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500',
              fontSize: '25px',
              lineHeight: '35px',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              color: '#0D98BA',
              margin: '0'
            }}>
              Custom<br />Web Design
            </h3>
          </div>

          {/* Responsive Web Design Tab */}
          <div style={{
            position: 'relative',
            width: '242px',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500',
              fontSize: '25px',
              lineHeight: '35px',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0'
            }}>
              Responsive<br />Web Design
            </h3>
          </div>

          {/* Website Redesign Tab */}
          <div style={{
            position: 'relative',
            width: '242px',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500',
              fontSize: '25px',
              lineHeight: '35px',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0'
            }}>
              Website<br />Redesign
            </h3>
          </div>

          {/* SEO Tab */}
          <div style={{
            position: 'relative',
            width: '242px',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500',
              fontSize: '25px',
              lineHeight: '35px',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0'
            }}>
              Search Engine<br />Optimization
            </h3>
          </div>

          {/* eCommerce Tab */}
          <div style={{
            position: 'relative',
            width: '242px',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500',
              fontSize: '25px',
              lineHeight: '35px',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0'
            }}>
              eCommerce<br />Storefronts
            </h3>
          </div>
        </div>

        {/* Blue Line */}
        <div style={{
          position: 'absolute',
          width: '1260px',
          height: '9px',
          left: '50%',
          top: '354px',
          transform: 'translateX(-50%)',
          background: '#0D98BA',
          borderRadius: '10px'
        }}></div>

        {/* Content Container */}
        <div style={{
          position: 'absolute',
          width: '100%',
          top: '377px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 89px',
          boxSizing: 'border-box'
        }}>
          {/* Left Content */}
          <div style={{
            width: '690px',
          }}>
            {/* Title with Arrow */}
            <div style={{
              position: 'relative',
              marginBottom: '30px'
            }}>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                fontSize: '28px',
                lineHeight: '35px',
                color: '#0D98BA',
                margin: '0'
              }}>
                Unique designs tailored to your brand's identity
              </h3>
              <div style={{
                position: 'absolute',
                right: '455px',
                top: '-20px',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14L12 9L17 14" stroke="#0D98BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '30px',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '32px'
            }}>
              We handcraft every website to reflect your vision and values — no templates, 
              no shortcuts. A custom experience that enhances brand recognition and drives 
              real results.
            </p>

            {/* Features List */}
            <div style={{
              marginTop: '60px'
            }}>
              {/* Feature 1 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '20px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.6 13.5L5 9.9L6.4 8.5L8.6 10.7L13.6 5.7L15 7.1L8.6 13.5Z" fill="#0D98BA"/>
                  </svg>
                </div>
                <p style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: '600',
                  fontSize: '20px',
                  lineHeight: '42px',
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  margin: '0'
                }}>
                  100% custom, no cookie-cutter layouts
                </p>
              </div>

              {/* Feature 2 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '20px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.6 13.5L5 9.9L6.4 8.5L8.6 10.7L13.6 5.7L15 7.1L8.6 13.5Z" fill="#0D98BA"/>
                  </svg>
                </div>
                <p style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: '600',
                  fontSize: '20px',
                  lineHeight: '42px',
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  margin: '0'
                }}>
                  Designed for conversion & engagement
                </p>
              </div>

              {/* Feature 3 */}
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '20px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.6 13.5L5 9.9L6.4 8.5L8.6 10.7L13.6 5.7L15 7.1L8.6 13.5Z" fill="#0D98BA"/>
                  </svg>
                </div>
                <p style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: '600',
                  fontSize: '20px',
                  lineHeight: '42px',
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  margin: '0'
                }}>
                  Strengthens your brand's digital identity
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Website Mockups */}
          <div style={{
            width: '632px',
            height: '422px',
            position: 'relative',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <Image 
              src="/website-mockups.png" 
              alt="Website Mockups" 
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrustSection;