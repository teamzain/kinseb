// pages/stats.js or app/stats/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// Define the types for our counter state
interface CounterState {
  clients: number;
  projects: number;
  satisfaction: number;
  experts: number;
}

const StatsSection = () => {
  const [counters, setCounters] = useState<CounterState>({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    experts: 0
  });
  
  const targetValues: CounterState = {
    clients: 50,
    projects: 70,
    satisfaction: 98,
    experts: 5
  };
  
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const animationStarted = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted.current) {
          setIsVisible(true);
          animationStarted.current = true;
          startCounterAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const startCounterAnimation = (): void => {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60 fps
    const totalFrames = duration / frameDuration;

    Object.entries(targetValues).forEach(([key, targetValue]) => {
      let frame = 0;
      
      const animate = (): void => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.min(Math.round(targetValue * progress), targetValue);
        
        setCounters(prev => ({
          ...prev,
          [key]: currentValue
        }));

        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  };

  const containerStyle = {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '60px 20px',
    backgroundColor: '#001525',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
  };

  const statsGridStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    padding: '0 20px'
  };

  const statItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
    padding: '20px 40px',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    flex: '1 1 300px',
    maxWidth: '400px',
    position: 'relative'
  };

  const iconContainerStyle = {
    width: '80px',  // Increased size
    height: '80px', // Increased size
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    transition: 'transform 0.3s ease'
  };

  const imageStyle = {
    width: '60px',  // Increased size
    height: '60px', // Increased size
    objectFit: 'contain',
    transition: 'transform 0.3s ease'
  };

  const contentStyle = {
    flex: 1,
    minWidth: '150px'
  };

  const numberStyle = {
    fontSize: '3rem', // Increased size
    fontWeight: 'bold',
    color: '#00b4d8',
    lineHeight: '1.2',
    marginBottom: '5px',
    transition: 'color 0.3s ease'
  };

  const textStyle = {
    fontSize: '1.1rem', // Slightly increased
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '500'
  };

  const sectionHeadingStyle = {
    fontSize: '2.5rem',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '50px',
    fontWeight: 'bold'
  };

  // Fix the TypeScript error by adding proper types to function parameters
  const handleHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean): void => {
    const item = e.currentTarget;
    const icon = item.querySelector('img');
    const number = item.querySelector('div[style*="fontSize: 3rem"]');

    if (isEnter) {
      item.style.transform = 'translateY(-5px)';
      if (icon) icon.style.transform = 'scale(1.1)';
      if (number) (number as HTMLElement).style.color = '#00d4ff';
    } else {
      item.style.transform = 'translateY(0)';
      if (icon) icon.style.transform = 'scale(1)';
      if (number) (number as HTMLElement).style.color = '#00b4d8';
    }
  };

  return (
    <>
      <Head>
        <title>Our Performance Metrics | Kinseb Web Development</title>
        <meta 
          name="description" 
          content="Discover our track record of success with 50+ happy clients, 70+ delivered projects, and 98% client satisfaction rate."
        />
        <meta 
          name="keywords" 
          content="client satisfaction, project delivery, tech experts, design experts, performance metrics"
        />
        <meta property="og:title" content="Our Performance Metrics | Kinseb Web Development" />
        <meta 
          property="og:description" 
          content="Discover our track record of success with 50+ happy clients, 70+ delivered projects, and 98% client satisfaction rate."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>

      <section ref={containerRef as React.RefObject<HTMLElement>} style={containerStyle} aria-label="Company Statistics">
    
        
        <div style={statsGridStyle}>
          <div 
            style={statItemStyle} 
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <div style={iconContainerStyle}>
              <img src="/images/people.png" alt="" style={imageStyle} aria-hidden="true" />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle} aria-label={`${counters.clients}+ Happy Clients`}>
                {counters.clients}+
              </div>
              <div style={textStyle}>Happy Clients</div>
            </div>
          </div>

          <div 
            style={statItemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <div style={iconContainerStyle}>
              <img src="/images/45.png" alt="" style={imageStyle} aria-hidden="true" />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle} aria-label={`${counters.projects}+ Projects Delivered`}>
                {counters.projects}+
              </div>
              <div style={textStyle}>Projects Delivered</div>
            </div>
          </div>

          <div 
            style={statItemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <div style={iconContainerStyle}>
              <img src="/images/46.png" alt="" style={imageStyle} aria-hidden="true" />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle} aria-label={`${counters.satisfaction}% Client Satisfaction`}>
                {counters.satisfaction}%
              </div>
              <div style={textStyle}>Client Satisfaction</div>
            </div>
          </div>

          <div 
            style={statItemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <div style={iconContainerStyle}>
              <img src="/images/47.png" alt="" style={imageStyle} aria-hidden="true" />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle} aria-label={`${counters.experts}+ Design & Tech Experts`}>
                {counters.experts}+
              </div>
              <div style={textStyle}>Design & Tech Experts</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;