import { useState } from 'react';

const ServiceCard = ({ title, description, imageSrc, color = '#36b2c8' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative w-full h-80 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 justify-between">
        <div>
          <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
          
          {/* Description - visible only on hover */}
          <div 
            className={`text-gray-200 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-base leading-relaxed">{description}</p>
          </div>
        </div>
        
        {/* Arrow */}
        <div className="self-end">
          <div 
            className="text-2xl"
            style={{ color }}
          >
            →
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesShowcase() {
  const services = [
    {
      title: "Web Development",
      description: "Our web development services deliver responsive, high-speed websites with secure, scalable back-end solutions, optimized for both user engagement and operational efficiency.",
      imageSrc: "/api/placeholder/800/600",
    },
    {
      title: "Mobile App Development",
      description: "Custom mobile applications built for iOS and Android platforms with intuitive interfaces and powerful functionality.",
      imageSrc: "/api/placeholder/800/600",
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance the user experience and create intuitive, engaging interfaces.",
      imageSrc: "/api/placeholder/800/600",
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud services that provide robust infrastructure and improve operational efficiency.",
      imageSrc: "/api/placeholder/800/600",
    }
  ];

  return (
    <div className="bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-white text-4xl font-bold mb-4">
            Our <span style={{ color: '#36b2c8' }}>Services</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}