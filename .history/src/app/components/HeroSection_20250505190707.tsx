import React from 'react';

const HeroSection = () => {
  // Fixed video paths
  const desktopVideo = "/video.mp4";
  const mobileVideo = "/videos/mobile-video.mp4";
  
  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Video */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        {/* We'll use media queries in CSS instead of JS condition */}
        <source src={desktopVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-60 z-1"></div>
      
      {/* Bottom left corner gradient */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-cyan-500/30 to-transparent z-2"></div>
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 box-border">
          {/* Text container with responsive classes */}
          <div className="max-w-2xl md:ml-4 mx-auto md:mx-0 text-center md:text-left">
            {/* Your Web Development Provider text */}
            <p className="text-cyan-300 font-medium mb-4 tracking-wider text-sm md:text-base uppercase opacity-0 translate-y-10 animate-fadeIn" 
               style={{animation: 'fadeIn 700ms forwards 200ms'}}>
              Your Web Development Provider
            </p>
            
            {/* Main Heading */}
            <div className="opacity-0 translate-y-10 animate-fadeIn"
                 style={{animation: 'fadeIn 700ms forwards 400ms'}}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="md:hidden">
                  Building <span className="text-cyan-300">Websites</span>
                  <br />That Drive Growth
                </span>
                <span className="hidden md:inline">
                  Building <span className="text-cyan-300">Websites</span> That Drive Growth
                </span>
              </h1>
            </div>
            
            {/* Description text */}
            <p className="text-gray-200 max-w-xl mx-auto md:mx-0 mb-8 text-base md:text-lg opacity-0 translate-y-10 animate-fadeIn"
               style={{animation: 'fadeIn 700ms forwards 600ms'}}>
              From startups to enterprises, we build responsive, SEO-optimized 
              websites. Let your brand stand out with designs tailored for results.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start opacity-0 translate-y-10 animate-fadeIn"
                 style={{animation: 'fadeIn 700ms forwards 800ms'}}>
              <button className="px-6 py-3 border-2 border-cyan-300 text-cyan-300 font-medium rounded hover:bg-cyan-300 hover:text-black transition-colors">
                See Our Work
              </button>
              <button className="px-6 py-3 bg-cyan-300 text-black font-medium rounded border-none hover:bg-cyan-500 transition-colors">
                Request A Quote
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom text with decorative lines */}
        <div className="absolute bottom-8 left-0 w-full text-center text-white text-sm opacity-0 translate-y-5 animate-fadeIn"
             style={{animation: 'fadeIn 700ms forwards 1000ms'}}>
          <div className="flex items-center justify-center gap-3">
            <span className="hidden md:block h-px w-12 bg-cyan-300/60"></span>
            <p>Built With Industry-Leading Technologies</p>
            <span className="hidden md:block h-px w-12 bg-cyan-300/60"></span>
          </div>
        </div>
      </div>
      
      {/* Add CSS for animations and mobile video */}
      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          video source {
            src: ${mobileVideo};
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;