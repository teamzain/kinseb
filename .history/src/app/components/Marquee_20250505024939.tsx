'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDocker, 
  FaGithub, FaNpm, FaDatabase, FaBootstrap, FaSass,
  FaPython, FaAws, FaJava, FaPhp, FaAngular, FaVuejs
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, 
  SiMongodb, SiGraphql, SiRedux, SiFirebase, SiVercel, SiNetlify,
  SiPostgresql, SiMysql, SiRust, SiGo, SiKubernetes, SiFlutter,
  SiElastic, SiTensorflow, SiAmazon, SiFigma
} from 'react-icons/si';

/**
 * WhiteTechStackMarquee Component
 * 
 * A visually enhanced, accessible marquee displaying technology stack icons
 * with smooth animations and interactive hover effects.
 * Modified with a white background and colored icons.
 */
const WhiteTechStackMarquee = () => {
  const [animate, setAnimate] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);

  // Tech icons with names (for accessibility) and colors
  const technologies = [
    { Icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
    { Icon: FaReact, name: 'React', color: '#61DAFB' },
    { Icon: FaNodeJs, name: 'Node.js', color: '#68A063' },
    { Icon: SiGraphql, name: 'GraphQL', color: '#E535AB' },
    { Icon: SiMongodb, name: 'MongoDB', color: '#4DB33D' },
    { Icon: FaGithub, name: 'GitHub', color: '#333333' },
    { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { Icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { Icon: SiTailwindcss, name: 'Tailwind CSS', color: '#38B2AC' },
    { Icon: SiRedux, name: 'Redux', color: '#764ABC' },
    { Icon: FaCss3Alt, name: 'CSS3', color: '#1572B6' },
    { Icon: FaHtml5, name: 'HTML5', color: '#E34F26' },
    { Icon: FaNpm, name: 'npm', color: '#CB3837' },
    { Icon: FaDatabase, name: 'Database', color: '#333333' },
    { Icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
    { Icon: FaDocker, name: 'Docker', color: '#2496ED' },
    { Icon: SiPostgresql, name: 'PostgreSQL', color: '#336791' },
    { Icon: FaAws, name: 'AWS', color: '#FF9900' },
    { Icon: SiKubernetes, name: 'Kubernetes', color: '#326CE5' },
    { Icon: FaPython, name: 'Python', color: '#3776AB' },
    { Icon: FaJava, name: 'Java', color: '#ED8B00' },
    { Icon: SiRust, name: 'Rust', color: '#DEA584' },
    { Icon: SiGo, name: 'Go', color: '#00ADD8' },
    { Icon: FaVuejs, name: 'Vue.js', color: '#4FC08D' },
    { Icon: FaAngular, name: 'Angular', color: '#DD0031' },
    { Icon: SiFlutter, name: 'Flutter', color: '#02569B' },
    { Icon: SiTensorflow, name: 'TensorFlow', color: '#FF6F00' },
    { Icon: SiFigma, name: 'Figma', color: '#F24E1E' },
  ];

  // Create duplicate arrays for seamless infinite loop
  const allTechnologies = [...technologies, ...technologies];

  // Control animation playback
  const pauseAnimation = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'paused';
    }
    setIsPaused(true);
  };

  const resumeAnimation = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'running';
    }
    setIsPaused(false);
  };

  useEffect(() => {
    // Start animation after component mounts with a slight delay for better performance
    const animationTimer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    // For more seamless looping, handle animation iteration
    const handleAnimationEnd = () => {
      if (marqueeRef.current) {
        marqueeRef.current.style.animation = 'none';
        // Force reflow
        void marqueeRef.current.offsetWidth;
        marqueeRef.current.style.animation = isPaused ? 'none' : 'scroll 40s linear infinite';
      }
    };

    if (marqueeRef.current) {
      marqueeRef.current.addEventListener('animationiteration', handleAnimationEnd);
    }

    return () => {
      clearTimeout(animationTimer);
      if (marqueeRef.current) {
        marqueeRef.current.removeEventListener('animationiteration', handleAnimationEnd);
      }
    };
  }, [isPaused]);

  // Adjust animation speed based on screen size for better performance
  useEffect(() => {
    const handleResize = () => {
      if (marqueeRef.current && !isPaused) {
        // Adjust speed based on screen width
        const speed = window.innerWidth < 768 ? '25s' : 
                     (window.innerWidth < 1024 ? '35s' : '40s');
        marqueeRef.current.style.animation = `scroll ${speed} linear infinite`;
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial call
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [animate, isPaused]);

  return (
    <section 
      aria-label="Technology Stack Showcase" 
      className="tech-stack-marquee w-full"
      ref={containerRef}
      style={{
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF', // Changed to white background
        padding: '6px 0',
        margin: '0',
        position: 'relative',
        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.1)', // Lightened shadow for white background
      }}
      onMouseEnter={pauseAnimation}
      onMouseLeave={resumeAnimation}
      onFocus={pauseAnimation}
      onBlur={resumeAnimation}
    >
      {/* Screen reader description */}
      <div className="sr-only">
        Technology stack showcase featuring various programming languages and tools.
      </div>
      
      <div 
        ref={marqueeRef}
        className="marquee-content" 
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: animate && !isPaused ? 'scroll 40s linear infinite' : 'none',
          padding: '4px 0',
        }}
        aria-hidden="true" // Hide from screen readers as we provided an alternative description
      >
        {allTechnologies.map((tech, index) => (
          <div key={index} 
            className="tech-icon"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 clamp(12px, 2vw, 30px)',
              height: 'clamp(24px, 3vw, 36px)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
            }}
            title={tech.name} // Show name on hover
          >
            <tech.Icon 
              style={{
                fontSize: 'clamp(24px, 3vw, 32px)',
                color: tech.color, // Using color from the technology definition
                filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.1))', // Lighter shadow for white background
                transition: 'all 0.3s ease',
              }} 
              className="icon"
              data-color={tech.color}
              aria-label={tech.name}
              role="img"
            />
            {/* Hidden text for better SEO */}
            <span className="sr-only">{tech.name}</span>
          </div>
        ))}
      </div>
      
      {/* Fade edges for better visual appearance */}
      <div className="fade-edge fade-left" aria-hidden="true"></div>
      <div className="fade-edge fade-right" aria-hidden="true"></div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        .tech-icon {
          position: relative;
          z-index: 1;
        }
        
        .tech-icon:hover {
          transform: translateY(-4px) scale(1.15);
        }
        
        .tech-icon:hover .icon {
          filter: drop-shadow(0 0 8px rgba(0,0,0,0.2)) brightness(1.2);
        }
        
        .tech-icon:hover::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #888;
          border-radius: 50%;
          box-shadow: 0 0 6px 1px rgba(0,0,0,0.2);
        }
        
        .fade-edge {
          content: '';
          position: absolute;
          top: 0;
          width: clamp(50px, 8vw, 100px);
          height: 100%;
          z-index: 2;
        }
        
        .fade-left {
          left: 0;
          background: linear-gradient(to right, #FFFFFF, transparent);
        }
        
        .fade-right {
          right: 0;
          background: linear-gradient(to left, #FFFFFF, transparent);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: none !important;
          }
          
          .tech-icon:hover {
            transform: scale(1.05);
          }
        }
        
        @media (max-width: 768px) {
          .marquee-content {
            padding: 4px 0;
          }
        }
        
        @media (max-width: 480px) {
          .tech-icon {
            margin: 0 8px !important;
          }
        }

        /* Make the component take full width, even outside of any container */
        .tech-stack-marquee {
          width: 100vw !important;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }
      `}</style>
    </section>
  );
};

export default WhiteTechStackMarquee;