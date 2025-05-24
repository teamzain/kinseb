'use client';

import React, { useEffect, useState, useRef } from 'react';

const WebDesignProcess = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);
  
  const processSteps = [
    {
      number: '01',
      title: 'Strategic Discovery',
      description: 'We begin by deeply understanding your business, goals, and audience to craft a powerful digital game plan.',
      bulletPoints: [
        'Define your ideal users & their pain points',
        'Clarify your brand\'s unique value proposition (UVP)',
        'Set clear goals with measurable KPIs'
      ],
      image: '/images/strategic-discovery.png'
    },
    {
      number: '02',
      title: 'Smart Planning & Architecture',
      description: 'We map out your website\'s content, flow, and messaging to guide users smoothly through your site toward conversion.',
      bulletPoints: [
        'Build wireframes, sitemap & user flows',
        'Ensure intuitive navigation & conversion paths',
        'Align tone & content with your brand voice'
      ],
      image: '/images/smart-planning.png'
    },
    {
      number: '03',
      title: 'Creative Design',
      description: 'We create visually stunning designs that reflect your brand identity and engage your target audience.',
      bulletPoints: [
        'Develop custom visual elements & illustrations',
        'Create responsive mockups for all devices',
        'Implement accessibility best practices'
      ],
      image: '/images/creative-design.png'
    },
    {
      number: '04',
      title: 'Development & Launch',
      description: 'We build your website with clean code and powerful functionality, then thoroughly test before launching.',
      bulletPoints: [
        'Write semantic, optimized code',
        'Implement SEO best practices',
        'Conduct cross-browser and device testing'
      ],
      image: '/images/development-launch.png'
    }
  ];

  // Handle scroll event to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerPosition = scrollPosition + (windowHeight * 0.3); // Trigger when section is 30% in view
      
      sectionRefs.current.forEach((section, index) => {
        if (section && section.offsetTop <= triggerPosition) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#0a2942',
        padding: '40px 0 100px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 20px',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <h1 style={{ 
            fontSize: '2.5rem',
            marginBottom: '16px',
          }}>
            Our Web Design <span style={{ color: '#3DB4D0' }}>Process</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            From research to results — here's how we turn ideas into impactful websites.
          </p>
        </div>

        {/* Progress line */}
        <div style={{
          position: 'sticky',
          top: '50%',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          marginBottom: '60px',
          zIndex: 1,
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#3DB4D0',
            width: `${(activeSection + 1) * (100 / processSteps.length)}%`,
            transition: 'width 0.5s ease-out',
          }}></div>
        </div>

        {/* Process steps */}
        {processSteps.map((step, index) => (
          <div
            key={index}
            ref={el => sectionRefs.current[index] = el}
            style={{
              display: 'flex',
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              alignItems: 'center',
              marginBottom: '100px',
              opacity: index <= activeSection ? 1 : 0.3,
              transform: index <= activeSection ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              minHeight: '400px',
            }}
          >
            <div style={{
              flex: '1',
              paddingRight: index % 2 === 0 ? '40px' : '0',
              paddingLeft: index % 2 === 0 ? '0' : '40px',
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#3DB4D0',
                marginBottom: '10px',
              }}>
                {step.number}
              </div>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '20px',
              }}>
                {step.title}
              </h2>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '24px',
              }}>
                {step.description}
              </p>
              <ul style={{
                listStyleType: 'none',
                padding: '0',
              }}>
                {step.bulletPoints.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    style={{
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#3DB4D0',
                      marginRight: '10px',
                      display: 'inline-block',
                    }}></div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              flex: '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div style={{
                border: '10px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              }}>
                <img
                  src={step.image || '/api/placeholder/400/320'}
                  alt={step.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebDesignProcess;