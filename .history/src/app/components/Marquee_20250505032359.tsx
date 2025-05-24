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
 * TechStackMarquee Component
 * 
 * A visually enhanced, accessible marquee displaying technology stack icons
 * with smooth animations and interactive hover effects.
 */
const TechStackMarquee = () => {
  const [animate, setAnimate] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Tech icons with names (for accessibility) and hover colors
  const technologies = [
    { Icon: SiNextdotjs, name: 'Next.js', hoverColor: '#ffffff' },
    { Icon: FaReact, name: 'React', hoverColor: '#61DAFB' },
    { Icon: FaNodeJs, name: 'Node.js', hoverColor: '#68A063' },
    { Icon: SiGraphql, name: 'GraphQL', hoverColor: '#E535AB' },
    { Icon: SiMongodb, name: 'MongoDB', hoverColor: '#4DB33D' },
    { Icon: FaGithub, name: 'GitHub', hoverColor: '#ffffff' },
    { Icon: SiJavascript, name: 'JavaScript', hoverColor: '#F7DF1E' },
    { Icon: SiTypescript, name: 'TypeScript', hoverColor: '#3178C6' },
    { Icon: SiTailwindcss, name: 'Tailwind CSS', hoverColor: '#38B2AC' },
    { Icon: SiRedux, name: 'Redux', hoverColor: '#764ABC' },
    { Icon: FaCss3Alt, name: 'CSS3', hoverColor: '#1572B6' },
    { Icon: FaHtml5, name: 'HTML5', hoverColor: '#E34F26' },
    { Icon: FaNpm, name: 'npm', hoverColor: '#CB3837' },
    { Icon: FaDatabase, name: 'Database', hoverColor: '#ffffff' },
    { Icon: SiFirebase, name: 'Firebase', hoverColor: '#FFCA28' },
    { Icon: FaDocker, name: 'Docker', hoverColor: '#2496ED' },
    { Icon: SiPostgresql, name: 'PostgreSQL', hoverColor: '#336791' },
    { Icon: FaAws, name: 'AWS', hoverColor: '#FF9900' },
    { Icon: SiKubernetes, name: 'Kubernetes', hoverColor: '#326CE5' },
    { Icon: FaPython, name: 'Python', hoverColor: '#3776AB' },
    { Icon: FaJava, name: 'Java', hoverColor: '#ED8B00' },
    { Icon: SiRust, name: 'Rust', hoverColor: '#DEA584' },
    { Icon: SiGo, name: 'Go', hoverColor: '#00ADD8' },
    { Icon: FaVuejs, name: 'Vue.js', hoverColor: '#4FC08D' },
    { Icon: FaAngular, name: 'Angular', hoverColor: '#DD0031' },
    { Icon: SiFlutter, name: 'Flutter', hoverColor: '#02569B' },
    { Icon: SiTensorflow, name: 'TensorFlow', hoverColor: '#FF6F00' },
    { Icon: SiFigma, name: 'Figma', hoverColor: '#F24E1E' },
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
      className="tech-stack-marquee"
      ref={containerRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#191919',
        padding: '6px 0', // Reduced from 16px to 6px
        margin: '0',
        position: 'relative',
        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.5)',
      }}
      onMouseEnter={pauseAnimation}
      onMouseLeave={resumeAnimation}
      onFocus={pauseAnimation}
      onBlur={resumeAnimation}
    >
      {/* Screen reader description */}
      <div className="sr-only">
       
      </div>
      
      <div 
        ref={marqueeRef}
        className="marquee-content" 
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: animate && !isPaused ? 'scroll 40s linear infinite' : 'none',
          padding: '4px 0', // Reduced from 12px to 4px
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
              margin: '0 clamp(15px, 3vw, 30px)', // Reduced right margin from 40px to 30px
              height: 'clamp(24px, 4vw, 32px)', // Reduced from 36-48px to 24-32px
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
            }}
            title={tech.name} // Show name on hover
          >
            <tech.Icon 
              style={{
                fontSize: 'clamp(22px, 3vw, 30px)', // Reduced from 32-42px to 22-30px
                color: '#FFFFFF',
                filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.3))',
                transition: 'all 0.3s ease',
              }} 
              className="icon"
              data-hover-color={tech.hoverColor}
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
          transform: translateY(-5px) scale(1.15); /* Reduced translateY from -8px to -5px */
        }
        
        .tech-icon:hover .icon {
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.6)) brightness(1.2);
        }
        
        .tech-icon:hover::after {
          content: '';
          position: absolute;
          bottom: -8px; /* Reduced from -12px to -8px */
          left: 50%;
          transform: translateX(-50%);
          width: 4px; /* Reduced from 6px to 4px */
          height: 4px; /* Reduced from 6px to 4px */
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 8px 2px rgba(255,255,255,0.6);
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
          background: linear-gradient(to right, #191919, transparent);
        }
        
        .fade-right {
          right: 0;
          background: linear-gradient(to left, #191919, transparent);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: none !important;
          }
          
          .tech-icon:hover {
            transform: scale(1.1);
          }
        }
        
        @media (max-width: 768px) {
          .marquee-content {
            padding: 3px 0; /* Reduced from 8px to 3px */
          }
        }
        
        @media (max-width: 480px) {
          .tech-icon {
            margin: 0 8px !important; /* Reduced from 10px to 8px */
          }
        }
      `}</style>
    </section>
  );
};

export default TechStackMarquee;