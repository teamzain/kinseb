'use client';
import { useState } from 'react';
import Image from 'next/image';

// Service Card Component
const ServiceCard = ({ iconSrc, title, description, hoverImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative flex flex-col justify-between p-7 h-[380px] bg-gradient-to-b from-cyan-700/30 to-black/30 bg-[#16161E] border border-[#0D98BA] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/30 cursor-pointer ${isHovered ? 'transform -translate-y-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Background Image */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isHovered ? 'opacity-10' : 'opacity-0'}`}>
        <Image
          src={hoverImage}
          alt={`${title} background`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
          priority={false}
        />
      </div>
      
      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="w-12 h-12 mb-6">
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            width={48}
            height={48}
            className="filter invert-[58%] sepia-[69%] saturate-[456%] hue-rotate-[152deg] brightness-[87%] contrast-[86%]"
          />
        </div>
        
        {/* Title */}
        <h3 className="text-white text-xl font-semibold mb-4">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        
        {/* Arrow Icon with Animation */}
        <div className={`text-cyan-400 text-2xl self-end transition-transform duration-300 ${isHovered ? 'transform translate-x-1' : ''}`}>
          →
        </div>
      </div>
      
      {/* Shine Effect on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full ${isHovered ? 'animate-shine' : ''}`}></div>
    </div>
  );
};

// Main Business Services Component
export default function BusinessServices() {
  const services = [
    {
      iconSrc: "/images/Vector.png",
      title: "Conversion-Focused Design",
      description: "Custom web design solutions fully optimized to drive more sales and leads.",
      hoverImage: "/images/conversion.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Industry-Specific Solutions",
      description: "Designs tailored to your unique industry with B2B, services, and ecommerce best practices.",
      hoverImage: "/images/industry.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: "Responsive Across Devices",
      description: "Responsive design that functions flawlessly across all devices and screen sizes.",
      hoverImage: "/images/responsive.jpg",
    },
    {
      iconSrc: "/images/search.png",
      title: "SEO-First Foundation",
      description: "Built with SEO best practices, laying the foundation to help your website rank higher.",
      hoverImage: "/images/seo.jpg",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#0b1a27] to-[#091830] py-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your <span className="text-cyan-400">Business</span> Is Unique
          </h2>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl md:mx-0 mx-auto">
            That's Why We Provide Custom Solutions Tailored To Your Needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Add this to your global CSS file or in a style tag
// @layer utilities {
//   .animate-shine {
//     animation: shine 1.5s ease-in-out;
//   }
//   @keyframes shine {
//     0% {
//       transform: translateX(-100%);
//     }
//     100% {
//       transform: translateX(100%);
//     }
//   }
// }