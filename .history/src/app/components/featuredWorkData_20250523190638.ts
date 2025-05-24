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

// Projects for Website Design Services (Service ID: 1)
const websiteDesignProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "TechVision Solutions",
    description: "Modern corporate website with custom animations and interactive elements that showcase their technology services.",
    image: "/images/projects/techvision-website.jpg"
  },
  {
    id: 2,
    title: "Bloom Creative Studio",
    description: "Creative portfolio website featuring dynamic galleries and smooth transitions to highlight their artistic work.",
    image: "/images/projects/bloom-website.jpg"
  },
  {
    id: 3,
    title: "NorthStar Consulting",
    description: "Professional business website with integrated client portal and streamlined contact forms for lead generation.",
    image: "/images/projects/northstar-website.jpg"
  }
];

// Projects for Website Redesign (Service ID: 2)
const websiteRedesignProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Heritage Finance Group",
    description: "Complete redesign transforming an outdated financial website into a modern, trustworthy digital presence.",
    image: "/images/projects/heritage-redesign.jpg"
  },
  {
    id: 2,
    title: "Urban Wellness Center",
    description: "Redesigned healthcare website with improved navigation, accessibility features, and appointment booking system.",
    image: "/images/projects/urban-redesign.jpg"
  },
  {
    id: 3,
    title: "Phoenix Manufacturing",
    description: "Industrial website redesign with enhanced product showcases and streamlined quote request functionality.",
    image: "/images/projects/phoenix-redesign.jpg"
  }
];

// Projects for Web App Design (Service ID: 3)
const webAppDesignProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "TaskFlow Pro",
    description: "Comprehensive project management web application with intuitive dashboards and collaboration tools.",
    image: "/images/projects/taskflow-webapp.jpg"
  },
  {
    id: 2,
    title: "DataInsight Analytics",
    description: "Complex data visualization web app with interactive charts and customizable reporting features.",
    image: "/images/projects/datainsight-webapp.jpg"
  },
  {
    id: 3,
    title: "LearnHub Platform",
    description: "Educational web application with course management, progress tracking, and interactive learning modules.",
    image: "/images/projects/learnhub-webapp.jpg"
  }
];

// Projects for Mobile App Design (Service ID: 4)
const mobileAppDesignProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "FitTracker Mobile",
    description: "Health and fitness mobile app with workout tracking, nutrition logging, and social features.",
    image: "/images/projects/fittracker-mobile.jpg"
  },
  {
    id: 2,
    title: "CityGuide Explorer",
    description: "Travel and tourism mobile app with interactive maps, local recommendations, and booking integration.",
    image: "/images/projects/cityguide-mobile.jpg"
  },
  {
    id: 3,
    title: "BudgetWise Finance",
    description: "Personal finance mobile app with expense tracking, budget planning, and financial goal setting.",
    image: "/images/projects/budgetwise-mobile.jpg"
  }
];

// Projects for Branding (Service ID: 5)
const brandingProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Evergreen Eco Solutions",
    description: "Complete brand identity for sustainable technology company including logo, color palette, and brand guidelines.",
    image: "/images/projects/evergreen-branding.jpg"
  },
  {
    id: 2,
    title: "Artisan Coffee Co.",
    description: "Warm, authentic brand identity for premium coffee roaster with packaging and storefront design elements.",
    image: "/images/projects/artisan-branding.jpg"
  },
  {
    id: 3,
    title: "Velocity Sports",
    description: "Dynamic brand identity for sports equipment company with energetic logo and athletic-inspired visuals.",
    image: "/images/projects/velocity-branding.jpg"
  }
];

// Projects for UI/UX Design (Service ID: 13)
const uiUxDesignProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "StreamlineHR Interface",
    description: "User-centered interface design for HR management software with simplified workflows and intuitive navigation.",
    image: "/images/projects/streamline-uiux.jpg"
  },
  {
    id: 2,
    title: "MedConnect Patient Portal",
    description: "Healthcare UI/UX design focusing on accessibility and ease of use for patient appointment and record management.",
    image: "/images/projects/medconnect-uiux.jpg"
  },
  {
    id: 3,
    title: "CloudSync Dashboard",
    description: "Complex dashboard design for cloud storage platform with data visualization and file management features.",
    image: "/images/projects/cloudsync-uiux.jpg"
  }
];

// Projects for eCommerce Web Design (Service ID: 12)
const ecommerceDesignProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "LuxeStyle Boutique",
    description: "High-end fashion e-commerce store with elegant product displays and streamlined shopping experience.",
    image: "/images/projects/luxestyle-ecommerce.jpg"
  },
  {
    id: 2,
    title: "GadgetHub Electronics",
    description: "Technology e-commerce platform with advanced product filtering, reviews, and comparison features.",
    image: "/images/projects/gadgethub-ecommerce.jpg"
  },
  {
    id: 3,
    title: "HomeDecor Marketplace",
    description: "Multi-vendor e-commerce platform for home goods with vendor dashboards and inventory management.",
    image: "/images/projects/homedecor-ecommerce.jpg"
  }
];

// Additional service projects for new services
const logoDesignProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Zenith Consulting Logo",
    description: "Professional logo design for business consulting firm with modern typography and symbolic elements.",
    image: "/images/projects/zenith-logo.jpg"
  },
  {
    id: 2,
    title: "Ocean Breeze Resort Logo",
    description: "Tropical logo design for luxury resort featuring wave elements and elegant typography.",
    image: "/images/projects/oceanbreeze-logo.jpg"
  },
  {
    id: 3,
    title: "TechNova Startup Logo",
    description: "Innovative logo design for technology startup with geometric shapes and modern color scheme.",
    image: "/images/projects/technova-logo.jpg"
  }
];

const brandIdentityProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Metro Architecture Firm",
    description: "Complete brand identity system for architectural firm including business cards, letterheads, and signage.",
    image: "/images/projects/metro-identity.jpg"
  },
  {
    id: 2,
    title: "Sunrise Wellness Spa",
    description: "Calming brand identity for wellness spa with cohesive visual elements across all touchpoints.",
    image: "/images/projects/sunrise-identity.jpg"
  },
  {
    id: 3,
    title: "Summit Financial Group",
    description: "Trustworthy brand identity for financial services with professional color palette and typography.",
    image: "/images/projects/summit-identity.jpg"
  }
];

const graphicDesignProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Innovation Conference Materials",
    description: "Complete graphic design package for tech conference including posters, banners, and digital assets.",
    image: "/images/projects/innovation-graphics.jpg"
  },
  {
    id: 2,
    title: "GreenEarth Campaign Graphics",
    description: "Environmental awareness campaign graphics with impactful visuals and persuasive messaging.",
    image: "/images/projects/greenearth-graphics.jpg"
  },
  {
    id: 3,
    title: "Product Launch Materials",
    description: "Marketing graphics for product launch including social media assets, brochures, and presentations.",
    image: "/images/projects/productlaunch-graphics.jpg"
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
    projects: websiteRedesignProjects
  },
  {
    serviceId: 3,
    projects: webAppDesignProjects
  },
  {
    serviceId: 4,
    projects: mobileAppDesignProjects
  },
  {
    serviceId: 5,
    projects: brandingProjects
  },
  {
    serviceId: 12,
    projects: ecommerceDesignProjects
  },
  {
    serviceId: 13,
    projects: uiUxDesignProjects
  },
  // Additional projects for new services (you can assign service IDs as needed)
  {
    serviceId: 6, // Logo Design
    projects: logoDesignProjects
  },
  {
    serviceId: 7, // Brand Identity
    projects: brandIdentityProjects
  },
  {
    serviceId: 8, // Graphic Design
    projects: graphicDesignProjects
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