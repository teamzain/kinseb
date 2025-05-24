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
  const animationStarted = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted.current) {
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

  // Fixed TypeScript compatible styles
  const containerStyle: React.CSSProperties = {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '60px 20px',
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(13, 152, 186, 0.2) 100%), #04091D',
    position: 'relative'
  };

  const statsCardStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '153.66px',
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(13, 152, 186, 0.2) 100%), #04091D',
  
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 20px'
  };

  const statItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const iconContainerStyle: React.CSSProperties = {
    width: '93.26px',
    height: '93.26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease'
  };

  const numberStyle: React.CSSProperties = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '56px',
    lineHeight: '64px',
    textAlign: 'center',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginBottom: '5px'
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '24px',
    color: '#FFFFFF'
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
        <div style={statsCardStyle}>
          <div style={statItemStyle}>
            <div style={iconContainerStyle}>
              <img src="/images/people.png" alt="" style={{ width: '93.26px', height: '93.26px' }} aria-hidden="true" />
            </div>
            <div>
              <div style={numberStyle} aria-label={`${counters.clients}+ Happy Clients`}>
                {counters.clients}+
              </div>
              <div style={textStyle}>Happy Clients</div>
            </div>
          </div>

          <div style={statItemStyle}>
            <div style={iconContainerStyle}>
              <img src="/images/45.png" alt="" style={{ width: '93.26px', height: '93.26px' }} aria-hidden="true" />
            </div>
            <div>
              <div style={numberStyle} aria-label={`${counters.projects}+ Projects Delivered`}>
                {counters.projects}+
              </div>
              <div style={textStyle}>Projects Delivered</div>
            </div>
          </div>

          <div style={statItemStyle}>
            <div style={iconContainerStyle}>
              <img src="/images/46.png" alt="" style={{ width: '93.26px', height: '93.26px' }} aria-hidden="true" />
            </div>
            <div>
              <div style={numberStyle} aria-label={`${counters.satisfaction}% Client Satisfaction`}>
                {counters.satisfaction}%
              </div>
              <div style={textStyle}>Client Satisfaction</div>
            </div>
          </div>

          <div style={statItemStyle}>
            <div style={iconContainerStyle}>
              <img src="/images/47.png" alt="" style={{ width: '93.26px', height: '93.26px' }} aria-hidden="true" />
            </div>
            <div>
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