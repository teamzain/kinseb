import React from 'react';

const DesignWordPreview = () => {
  // Configure the design words to match the reference image
  const designWords = [
    { color: '#0D98BA', opacity: 1, textShadow: '0 0 2px rgba(13, 152, 186, 0.8)', stroke: 'none' },
    { color: 'transparent', opacity: 0.8, textShadow: 'none', stroke: '1px #0D98BA' },
    { color: 'transparent', opacity: 0.6, textShadow: 'none', stroke: '1px rgba(255, 255, 255, 0.7)' },
    { color: 'transparent', opacity: 0.4, textShadow: 'none', stroke: '1px rgba(255, 255, 255, 0.5)' },
    { color: 'transparent', opacity: 0.25, textShadow: 'none', stroke: '1px rgba(255, 255, 255, 0.3)' },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-[#04091D] to-[#072047]">
      <div className="relative w-64 h-96">
        {designWords.map((design, index) => (
          <div 
            key={index} 
            className="absolute w-full text-center font-black text-6xl tracking-wide uppercase"
            style={{ 
              color: design.color,
              opacity: design.opacity,
              textShadow: design.textShadow,
              WebkitTextStroke: design.stroke,
              top: `${index * 36}px`,
            }}
          >
            DESIGN
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignWordPreview;