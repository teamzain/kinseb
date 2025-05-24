'use client';

import { useEffect, useRef, useState } from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';

// Initialize fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className={`
        relative w-full h-[660px] mx-auto overflow-hidden
        bg-[#04091D] border border-black shadow-md
        transition-all duration-1000 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
      `}
      style={{
        background: 'linear-gradient(270deg, rgba(0, 0, 0, 0) -28.61%, #04091D 210%)',
      }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#04091D] z-10"></div>
        {/* Replace with your actual image path */}
        <Image 
          src="/placeholder-banner.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8 lg:px-16">
        {/* Subtitle */}
        <div 
          className={`
            ${poppins.className} text-[#0D94BB] text-xl md:text-2xl font-semibold text-center mb-4
            transition-all duration-700 delay-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          From Idea to Execution
        </div>

        {/* Main Title */}
        <h1 
          className={`
            ${poppins.className} text-white text-3xl md:text-5xl lg:text-6xl font-semibold 
            text-center max-w-6xl leading-tight md:leading-snug lg:leading-normal mb-12
            transition-all duration-700 delay-500 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          Crafting <span className="text-[#0D94BB]">Powerful</span> Web Experiences 
          <br className="hidden md:block" /> That Convert & Perform
        </h1>

        {/* Buttons */}
        <div 
          className={`
            flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6
            transition-all duration-700 delay-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {/* Primary Button */}
          <button 
            className={`
              ${lato.className} font-semibold px-8 py-3 
              bg-[#0D98BA] text-[#04091D] rounded-md
              border-2 border-[#0D98BA] hover:bg-[#0D98BA]/90
              transition-all duration-300
            `}
          >
            Speak With Our Experts
          </button>

          {/* Secondary Button */}
          <button 
            className={`
              ${lato.className} font-semibold px-8 py-3
              border-2 border-[#0D98BA] text-[#0D98BA] rounded-md
              hover:bg-[#0D98BA]/10 transition-all duration-300
            `}
          >
            View Case Studies
          </button>
        </div>
      </div>
    </div>
  );
}