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
  SiElastic, SiTensorflow
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
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);

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
      className="w-full overflow-hidden bg-[#191919] py-4 m-0 relative shadow-[inset_0_0_25px_rgba(0,0,0,0.5)]"
      ref={containerRef}
      onMouseEnter={pauseAnimation}
      onMouseLeave={resumeAnimation}
      onFocus={pauseAnimation}
      onBlur={resumeAnimation}
    >
      {/* Screen reader description */}
      <div className="sr-only">
        A scrolling showcase of programming languages and technologies including React, JavaScript, TypeScript, Node.js and many more.
      </div>
      
      <div 
        ref={marqueeRef}
        className="flex whitespace-nowrap py-3"
        style={{
          animation: animate && !isPaused ? 'scroll 40s linear infinite' : 'none'
        }}
        aria-hidden="true" // Hide from screen readers as we provided an alternative description
      >
        {allTechnologies.map((tech, index) => (
          <div key={index} 
            className="inline-flex items-center justify-center mx-[clamp(15px,3vw,40px)] h-[clamp(36px,5vw,48px)] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative hover:translate-y-[-8px] hover:scale-110 group"
            title={tech.name} // Show name on hover
          >
            <tech.Icon 
              className="text-[clamp(32px,4vw,42px)] text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] group-hover:brightness-120"
              aria-label={tech.name}
              role="img"
            />
            {/* Hidden text for better SEO */}
            <span className="sr-only">{tech.name}</span>
            
            {/* Dot indicator on hover */}
            <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]"></div>
          </div>
        ))}
      </div>
      
      {/* Fade edges for better visual appearance */}
      <div className="absolute top-0 left-0 w-[clamp(50px,8vw,100px)] h-full z-10 bg-gradient-to-r from-[#191919] to-transparent" aria-hidden="true"></div>
      <div className="absolute top-0 right-0 w-[clamp(50px,8vw,100px)] h-full z-10 bg-gradient-to-l from-[#191919] to-transparent" aria-hidden="true"></div>
      
      {/* Keyframes for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate {
            animation: none !important;
          }
        }
        
        @media (max-width: 480px) {
          div[title] {
            margin: 0 10px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TechStackMarquee;