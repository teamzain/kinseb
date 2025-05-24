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

// Projects for Website Development (Service ID: 14)
const websiteDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "CorporateEdge Solutions",
    description: "Full-stack website development for consulting firm with advanced contact forms, service calculators, and client portal integration.",
    image: "/images/projects/corporateedge-development.jpg"
  },
  {
    id: 2,
    title: "GreenTech Innovations",
    description: "Responsive website development with custom CMS, blog functionality, and integration with third-party sustainability tracking APIs.",
    image: "/images/projects/greentech-development.jpg"
  },
  {
    id: 3,
    title: "MedPro Healthcare Network",
    description: "HIPAA-compliant website development with patient portal, appointment scheduling system, and secure document management.",
    image: "/images/projects/medpro-development.jpg"
  }
];

// Projects for Web App Development (Service ID: 15)
const webAppDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "ProjectHub Management",
    description: "Comprehensive project management web application with real-time collaboration, time tracking, and advanced reporting features.",
    image: "/images/projects/projecthub-webapp.jpg"
  },
  {
    id: 2,
    title: "FinanceTracker Pro",
    description: "Advanced financial management web app with budgeting tools, expense tracking, investment portfolio management, and AI-powered insights.",
    image: "/images/projects/financetracker-webapp.jpg"
  },
  {
    id: 3,
    title: "EduLearn Platform",
    description: "E-learning web application with course management, video streaming, progress tracking, and interactive assessment tools.",
    image: "/images/projects/edulearn-webapp.jpg"
  }
];

// Projects for Custom Web Development (Service ID: 16)
const customWebDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "LogisticFlow System",
    description: "Custom logistics management system with route optimization, real-time tracking, and automated dispatch scheduling for transportation company.",
    image: "/images/projects/logisticflow-custom.jpg"
  },
  {
    id: 2,
    title: "ResearchData Portal",
    description: "Specialized research data management platform with advanced analytics, visualization tools, and collaborative research features.",
    image: "/images/projects/researchdata-custom.jpg"
  },
  {
    id: 3,
    title: "EventPro Management",
    description: "Custom event management system with ticketing, vendor coordination, venue management, and real-time event monitoring capabilities.",
    image: "/images/projects/eventpro-custom.jpg"
  }
];

// Projects for E-commerce Development (Service ID: 17)
const ecommerceDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "FashionForward Boutique",
    description: "High-end fashion e-commerce platform with advanced product customization, AR try-on features, and personalized shopping experiences.",
    image: "/images/projects/fashionforward-ecommerce.jpg"
  },
  {
    id: 2,
    title: "TechGear Marketplace",
    description: "Multi-vendor electronics marketplace with advanced search, product comparison, bulk ordering, and B2B customer portals.",
    image: "/images/projects/techgear-ecommerce.jpg"
  },
  {
    id: 3,
    title: "OrganicHarvest Store",
    description: "Subscription-based organic food e-commerce with meal planning, nutritional tracking, and farm-to-table supply chain integration.",
    image: "/images/projects/organicharvest-ecommerce.jpg"
  }
];

// Projects for Shopify Development (Service ID: 18)
const shopifyDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "LuxeCosmetics Shopify Store",
    description: "Premium beauty brand Shopify store with custom product bundling, subscription management, and loyalty program integration.",
    image: "/images/projects/luxecosmetics-shopify.jpg"
  },
  {
    id: 2,
    title: "ActiveGear Sports Shop",
    description: "Sports equipment Shopify store with size guides, product customization, team ordering features, and inventory management.",
    image: "/images/projects/activegear-shopify.jpg"
  },
  {
    id: 3,
    title: "ArtisanCraft Marketplace",
    description: "Handmade goods Shopify store with artist profiles, custom order management, and integrated shipping solutions for unique items.",
    image: "/images/projects/artisancraft-shopify.jpg"
  }
];

// Projects for WordPress Development (Service ID: 19)
const wordPressDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "LegalEagle Law Firm",
    description: "Professional WordPress site for law firm with case study management, attorney profiles, and secure client communication portal.",
    image: "/images/projects/legaleagle-wordpress.jpg"
  },
  {
    id: 2,
    title: "CreativeStudio Agency",
    description: "Portfolio-focused WordPress site for creative agency with project showcases, team profiles, and integrated project inquiry system.",
    image: "/images/projects/creativestudio-wordpress.jpg"
  },
  {
    id: 3,
    title: "WellnessHub Community",
    description: "Health and wellness WordPress site with membership features, course management, and community forums for wellness practitioners.",
    image: "/images/projects/wellnesshub-wordpress.jpg"
  }
];

// Projects for POS Development (Service ID: 20)
const posDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "RetailMax POS System",
    description: "Comprehensive POS solution for retail chain with inventory management, customer loyalty programs, and multi-location reporting.",
    image: "/images/projects/retailmax-pos.jpg"
  },
  {
    id: 2,
    title: "CafeConnect POS",
    description: "Restaurant POS system with table management, kitchen display integration, online ordering, and detailed sales analytics.",
    image: "/images/projects/cafeconnect-pos.jpg"
  },
  {
    id: 3,
    title: "ServicePro POS",
    description: "Service-based business POS with appointment scheduling, customer management, service tracking, and automated billing features.",
    image: "/images/projects/servicepro-pos.jpg"
  }
];

// Projects for Custom Software Development (Service ID: 21)
const customSoftwareDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "ManufacturingFlow ERP",
    description: "Enterprise resource planning software for manufacturing company with production scheduling, quality control, and supply chain management.",
    image: "/images/projects/manufacturingflow-software.jpg"
  },
  {
    id: 2,
    title: "HealthRecords Management",
    description: "HIPAA-compliant medical records management system with patient portals, appointment scheduling, and integrated billing features.",
    image: "/images/projects/healthrecords-software.jpg"
  },
  {
    id: 3,
    title: "PropertyManager Pro",
    description: "Real estate management software with tenant portals, maintenance tracking, lease management, and financial reporting capabilities.",
    image: "/images/projects/propertymanager-software.jpg"
  }
];

// Projects for Backend & API Development (Service ID: 22)
const backendApiDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "DataSync API Platform",
    description: "RESTful API platform for data synchronization between multiple business systems with real-time updates and automated workflows.",
    image: "/images/projects/datasync-api.jpg"
  },
  {
    id: 2,
    title: "PaymentGateway Integration",
    description: "Secure payment processing API with multi-currency support, fraud detection, and comprehensive transaction management features.",
    image: "/images/projects/paymentgateway-api.jpg"
  },
  {
    id: 3,
    title: "AnalyticsEngine Backend",
    description: "High-performance backend system for data analytics with machine learning capabilities and real-time processing for business intelligence.",
    image: "/images/projects/analyticsengine-api.jpg"
  }
];

// Collection of all project sets by service ID
const allDevelopmentProjects: ProjectCollection[] = [
  {
    serviceId: 14,
    projects: websiteDevelopmentProjects
  },
  {
    serviceId: 15,
    projects: webAppDevelopmentProjects
  },
  {
    serviceId: 16,
    projects: customWebDevelopmentProjects
  },
  {
    serviceId: 17,
    projects: ecommerceDevelopmentProjects
  },
  {
    serviceId: 18,
    projects: shopifyDevelopmentProjects
  },
  {
    serviceId: 19,
    projects: wordPressDevelopmentProjects
  },
  {
    serviceId: 20,
    projects: posDevelopmentProjects
  },
  {
    serviceId: 21,
    projects: customSoftwareDevelopmentProjects
  },
  {
    serviceId: 22,
    projects: backendApiDevelopmentProjects
  }
];

// Get projects for a specific service ID
export const getDevelopmentProjectsByServiceId = (serviceId: number): FeaturedProject[] => {
  const collection = allDevelopmentProjects.find(p => p.serviceId === serviceId);
  return collection ? collection.projects : websiteDevelopmentProjects; // Default to website development projects
};

// Background image for the showcase component
export const showcaseBackground = "/images/feature.png";

// Monitor/laptop frame image
export const monitorFrameImage = "/images/ct2.png";

export default allDevelopmentProjects;