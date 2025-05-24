export interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ProjectCollection {
  serviceId: number;
  projects: FeaturedProject[];
}

// Projects for Website Design (Service ID: 1)
const websiteDesignProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Ejil Enterprise",
    description: "For InnovateTech, we engineered and launched a comprehensive web platform. This robust solution significantly enhanced their digital presence for better accessibility and engagement, while critically streamlining internal operations for remarkable improvements in efficiency.",
    image: "/images/5.jpg"
  },
  {
    id: 2,
    title: "Vertex Media",
    description: "Our team developed a modern website for Vertex Media that simplified their publishing workflow while presenting content beautifully. The custom solution integrated seamlessly with their existing tools while providing advanced analytics and content management capabilities.",
    image: "/images/projects/vertex-website.jpg"
  },
  {
    id: 3,
    title: "NexGen Healthcare",
    description: "We built a patient-focused website for NexGen Healthcare that improved information accessibility and user experience. The responsive design ensures patients can easily find providers, services, and resources on any device, resulting in higher engagement rates.",
    image: "/images/projects/nexgen-website.jpg"
  }
];

// Projects for E-commerce Solutions (Service ID: 2)
const ecommerceProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Artisan Marketplace",
    description: "We developed a custom e-commerce platform for Artisan Marketplace that connects independent craftspeople with customers worldwide. The solution includes secure payments, inventory management, and a sophisticated review system, increasing average order value by 23%.",
    image: "/images/projects/artisan-ecommerce.jpg"
  },
  {
    id: 2,
    title: "TechElite Store",
    description: "For TechElite, we created a high-performance e-commerce store with advanced product filtering, comparison tools, and personalized recommendations. The optimized checkout process reduced cart abandonment by 35% and boosted conversion rates significantly.",
    image: "/images/projects/techelite-ecommerce.jpg"
  },
  {
    id: 3,
    title: "Wellness Essentials",
    description: "Our e-commerce solution for Wellness Essentials features subscription capabilities, loyalty program integration, and seamless inventory management. The mobile-first approach resulted in a 42% increase in mobile conversions and expanded their customer base.",
    image: "/images/projects/wellness-ecommerce.jpg"
  }
];

// Projects for Digital Marketing (Service ID: 3)
const digitalMarketingProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "GlobalTech Campaign",
    description: "We executed a comprehensive digital marketing strategy for GlobalTech that spanned social media, email, and content marketing. Our data-driven approach increased qualified leads by 67% and helped establish their thought leadership in the industry.",
    image: "/images/projects/globaltech-marketing.jpg"
  },
  {
    id: 2,
    title: "EcoLife Brand Launch",
    description: "For EcoLife's sustainable product line launch, we created an integrated marketing campaign that highlighted their eco-friendly practices. The campaign generated over 500,000 impressions and resulted in a successful product launch with 200% of projected sales.",
    image: "/images/projects/ecolife-marketing.jpg"
  },
  {
    id: 3,
    title: "FinSmart Lead Generation",
    description: "Our targeted lead generation campaign for FinSmart used precision audience targeting and compelling creative assets. The multi-channel approach delivered a 43% reduction in customer acquisition costs while maintaining high-quality prospect engagement.",
    image: "/images/projects/finsmart-marketing.jpg"
  }
];

// Collection of all project sets by service ID
const allProjects: ProjectCollection[] = [
  {
    serviceId: 1,
    projects: websiteDesignProjects
  },
  {
    serviceId: 2,
    projects: ecommerceProjects
  },
  {
    serviceId: 3, 
    projects: digitalMarketingProjects
  }
];

// Get projects for a specific service ID
export const getProjectsByServiceId = (serviceId: number): FeaturedProject[] => {
  const collection = allProjects.find(p => p.serviceId === serviceId);
  return collection ? collection.projects : websiteDesignProjects; // Default to website projects
};

// Background image for the showcase component
export const showcaseBackground = "/images/feature.png";

// Monitor/laptop frame image
export const monitorFrameImage = "/images/ct2.png";