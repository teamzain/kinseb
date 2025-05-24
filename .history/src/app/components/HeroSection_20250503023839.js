'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// SVG Arrow Icon
const ArrowIcon = () => (
  <svg className="icon icon-lib-icon-arrow3" aria-hidden="true" role="img" style={{
    width: '24px',
    height: '24px',
    fill: 'currentColor',
    marginLeft: '8px',
    transition: 'transform 0.3s ease',
  }}>
    <path d="M13.025 1l8.91 8.91-8.91 8.909M0 9.91h21.935" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      strokeLinejoin="round"/>
  </svg>
);

export default function HeroSection() {
  const scrollVElements = useRef([]);
  
  useEffect(() => {
    // Animation for vertical scrolling images
    scrollVElements.current.forEach((el, i) => {
      if (!el) return;
      
      const direction = i % 2 === 0 ? 1 : -1;
      let position = 0;
      
      const animate = () => {
        position += 0.5 * direction;
        
        // Reset position when it gets too large for infinite scroll effect
        if (position > 1000) position = 0;
        if (position < -1000) position = 0;
        
        el.style.transform = `translateY(${position * -1}px)`;
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    });
  }, []);

  // These are the image paths you should replace with your own images
  const columnOneImages = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
  ];

  const columnTwoImages = [
    '/images/7.jpg',
    '/images/2.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/3.jpg',
 
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
  ];

  const columnThreeImages = [
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
  ];

  return (
    <section className="hero-section" style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#091135',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center bottom',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '5vmin',
      paddingBottom: '5vmin',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        color: '#091135',
      }}>
        {/* Main Content Flex Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 3,
        }}>
          {/* Content Section - LEFT - EXACT MATCH TO IMAGE */}
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingRight: '2rem',
            zIndex: 3,
            marginTop: '40px',
          }}>
            {/* Heading */}
            <div style={{
              marginBottom: '30px',
              width: '100%',
              textAlign: 'left',
            }}>
              <h1 style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#1E90FF',
                margin: '0 0 10px 0',
              }}>Your Web Development Provider</h1>
              
              <p style={{
                fontSize: 'clamp(36px, 3.5vw + 1rem, 6rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 15px 0',
                color: '#fff',
              }}>
                <span style={{ color: '#ffffff' }}>Building </span>
                <span style={{ color: '#1E90FF' }}>Websites </span>
                <span style={{ color: '#ffffff' }}>That Drive Growth</span>
              </p>
              
              <div style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                fontWeight: 400,
                color: '#fff',
                maxWidth: '540px',
                marginTop: '20px',
              }}>
                <p>From startups to enterprises, we build responsive, SEO-optimized websites.</p>
                <p>Let your brand stand out with designs tailored for results.</p>
              </div>
            </div>
            
            {/* CTA Buttons - EXACT MATCH TO IMAGE */}
            <div style={{
              display: 'flex',
              gap: '15px',
              marginBottom: '30px',
            }}>
              {/* See Our Work Button */}
              <Link href="/our-work/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.7em 1.4em',
                fontSize: '16px',
                fontWeight: 500,
                color: '#ffffff',
                backgroundColor: 'transparent',
                border: '1px solid #1E90FF',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                borderRadius: '2px',
              }}>
                <span>See Our Work</span>
              </Link>
              
              {/* Request A Quote Button */}
              <Link href="/request-a-quote/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.7em 1.4em',
                fontSize: '16px',
                fontWeight: 500,
                color: '#ffffff',
                backgroundColor: '#1E90FF',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                borderRadius: '2px',
              }}>
                <span>Request A Quote</span>
              </Link>
            </div>
          </div>
          
          {/* Images Section - RIGHT - SAME LAYOUT BUT WITH CUSTOM IMAGES */}
          <div className="project-gallery" style={{
            flex: '1',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
            height: '100%',
            maxHeight: '1200px',
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transform: 'rotate(5deg)',
              transformOrigin: 'center center',
              paddingBottom: '20px',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                gap: '1px',
              }}>
                {/* Column 1 */}
                <div style={{
                  flex: '1',
                  overflow: 'hidden',
                  borderRadius: '8px',
                }}>
                  <div 
                    className="v-scroll" 
                    ref={el => scrollVElements.current[0] = el}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      padding: '5px',
                    }}
                  >
                    {/* Duplicate images for infinite scroll effect */}
                    {[...columnOneImages, ...columnOneImages, ...columnOneImages].map((src, index) => (
                      <div key={`col1-${index}`} style={{
                        width: '100%',
                        height: '220px',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '10px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      }}>
                        <Image 
                          src={src}
                          alt={`Project image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Column 2 */}
                <div style={{
                  flex: '1',
                  overflow: 'hidden',
                  borderRadius: '8px',
                }}>
                  <div 
                    className="v-scroll" 
                    ref={el => scrollVElements.current[1] = el}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      padding: '5px',
                      marginTop: '20px', // Offset to create staggered effect
                    }}
                  >
                    {/* Duplicate images for infinite scroll effect */}
                    {[...columnTwoImages, ...columnTwoImages, ...columnTwoImages].map((src, index) => (
                      <div key={`col2-${index}`} style={{
                        width: '100%',
                        height: '220px',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '10px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      }}>
                        <Image 
                          src={src}
                          alt={`Project image ${index + 6}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Column 3 */}
                <div style={{
                  flex: '1',
                  overflow: 'hidden',
                  borderRadius: '8px',
                }}>
                  <div 
                    className="v-scroll" 
                    ref={el => scrollVElements.current[2] = el}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      padding: '5px',
                    }}
                  >
                    {/* Duplicate images for infinite scroll effect */}
                    {[...columnThreeImages, ...columnThreeImages, ...columnThreeImages].map((src, index) => (
                      <div key={`col3-${index}`} style={{
                        width: '100%',
                        height: '220px',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '10px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      }}>
                        <Image 
                          src={src}
                          alt={`Project image ${index + 11}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Gradient Overlay for Images */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(to right, rgba(0, 4, 42, 0.8) 0%, rgba(0, 4, 42, 0.4) 100%)',
                zIndex: 2,
                pointerEvents: 'none',
              }}></div>
            </div>
          </div>
        </div>
        
        {/* Background Gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(to top, rgba(0, 4, 42, 1) 0%, rgba(0, 4, 42, 0.9) 60%, rgba(0, 4, 42, 0.8) 100%)',
          zIndex: 1,
        }}></div>
      </div>
      
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Raleway:wght@300;400;500;700&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #1B2C5C;
        }
        
        .hero-section {
          height: 100vh;
          min-height: 800px;
        }
        
        .project-gallery {
          perspective: 1000px;
        }
        
        .v-scroll {
          transition: transform 0.5s ease-out;
        }
        
        @media (max-width: 1112px) {
          body {
            font-size: 18px;
          }
          
          .hero-section {
            height: auto;
            min-height: 100vh;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 20px;
          }
          
          .hero-section > div > div:first-of-type {
            flex-direction: column;
          }
          
          .hero-section > div > div:first-of-type > div:first-of-type {
            margin-top: 2rem;
            padding-right: 0;
          }
          
          .project-gallery {
            height: 600px;
            margin-top: 30px;
            margin-bottom: 30px;
          }
        }
      `}</style>
    </section>
  );
}