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


const seoStrategyProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "TechStart Innovations",
    description: "Comprehensive SEO strategy for B2B SaaS company resulting in 300% increase in organic traffic and 150% growth in qualified leads over 12 months.",
    image: "/images/projects/techstart-seo.jpg"
  },
  {
    id: 2,
    title: "GrowthConsulting Pro",
    description: "Strategic SEO roadmap for consulting firm that achieved first-page rankings for 85% of target keywords and doubled organic conversion rates.",
    image: "/images/projects/growthconsulting-seo.jpg"
  },
  {
    id: 3,
    title: "InnovateLaw Partners",
    description: "Long-term SEO strategy for legal practice that established market leadership with top 3 rankings for competitive legal terms in major metropolitan area.",
    image: "/images/projects/innovatelaw-seo.jpg"
  }
];

// Projects for Local SEO (Service ID: 24)
const localSEOProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Downtown Dental Care",
    description: "Local SEO optimization for dental practice resulting in 250% increase in local search visibility and 40% more appointment bookings from organic search.",
    image: "/images/projects/downtown-dental-local.jpg"
  },
  {
    id: 2,
    title: "Metro Home Services",
    description: "Multi-location local SEO campaign for home services company achieving #1 local rankings in 15 service areas and 180% increase in service calls.",
    image: "/images/projects/metro-home-local.jpg"
  },
  {
    id: 3,
    title: "Artisan Coffee Roasters",
    description: "Local SEO strategy for specialty coffee shop chain that dominated local coffee searches and increased foot traffic by 60% across all locations.",
    image: "/images/projects/artisan-coffee-local.jpg"
  }
];

// Projects for Technical SEO (Service ID: 25)
const technicalSEOProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "EcommercePlus Platform",
    description: "Technical SEO overhaul for large e-commerce site fixing critical crawling issues and improving Core Web Vitals, resulting in 45% increase in organic traffic.",
    image: "/images/projects/ecommerceplus-technical.jpg"
  },
  {
    id: 2,
    title: "DataTech Solutions",
    description: "Complex technical SEO project for enterprise software company resolving indexing issues and implementing structured data, boosting search visibility by 200%.",
    image: "/images/projects/datatech-technical.jpg"
  },
  {
    id: 3,
    title: "HealthSystem Network",
    description: "Healthcare website technical optimization improving site speed by 65% and mobile usability scores, leading to better patient portal engagement.",
    image: "/images/projects/healthsystem-technical.jpg"
  }
];

// Projects for On-Page SEO (Service ID: 26)
const onPageSEOProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "FitnessFirst Academy",
    description: "On-page optimization for fitness education company achieving first-page rankings for 90% of target fitness certification keywords.",
    image: "/images/projects/fitnessfirst-onpage.jpg"
  },
  {
    id: 2,
    title: "GreenLiving Blog",
    description: "Content and on-page SEO optimization for sustainability blog resulting in 400% increase in organic traffic and improved engagement metrics.",
    image: "/images/projects/greenliving-onpage.jpg"
  },
  {
    id: 3,
    title: "TechReview Hub",
    description: "On-page SEO improvements for technology review site leading to top 5 rankings for competitive product review keywords and increased affiliate revenue.",
    image: "/images/projects/techreview-onpage.jpg"
  }
];

// Projects for Off-Page SEO (Service ID: 27)
const offPageSEOProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "StartupGrowth Capital",
    description: "Strategic link building campaign for investment firm earning 150+ high-authority backlinks and establishing thought leadership in fintech space.",
    image: "/images/projects/startupgrowth-offpage.jpg"
  },
  {
    id: 2,
    title: "EcoDesign Studios",
    description: "Off-page SEO and digital PR campaign for architecture firm resulting in features in major design publications and 300% increase in domain authority.",
    image: "/images/projects/ecodesign-offpage.jpg"
  },
  {
    id: 3,
    title: "HealthTech Innovations",
    description: "Link building and authority building strategy for healthcare technology company establishing industry credibility and improving search rankings by 250%.",
    image: "/images/projects/healthtech-offpage.jpg"
  }
];

// Projects for E-commerce SEO (Service ID: 28)
const ecommerceSEOProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "LuxeFashion Boutique",
    description: "E-commerce SEO optimization for luxury fashion retailer achieving 350% increase in organic revenue and top rankings for high-value fashion keywords.",
    image: "/images/projects/luxefashion-ecommerce.jpg"
  },
  {
    id: 2,
    title: "TechGadget Store",
    description: "Comprehensive e-commerce SEO for electronics retailer resulting in 280% growth in organic traffic and 180% increase in online sales from search.",
    image: "/images/projects/techgadget-ecommerce.jpg"
  },
  {
    id: 3,
    title: "OrganicWellness Shop",
    description: "E-commerce SEO strategy for health and wellness store achieving market-leading positions for competitive supplement and wellness product searches.",
    image: "/images/projects/organicwellness-ecommerce.jpg"
  }
];

// Projects for Content Strategy (Service ID: 29)
const contentStrategyProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "FinanceWise Education",
    description: "Content strategy and topic cluster development for financial education platform resulting in 500% increase in organic traffic and improved user engagement.",
    image: "/images/projects/financewise-content.jpg"
  },
  {
    id: 2,
    title: "B2B Marketing Hub",
    description: "Strategic content planning for marketing agency blog achieving thought leadership status and generating 200+ qualified leads monthly from organic search.",
    image: "/images/projects/b2bmarketing-content.jpg"
  },
  {
    id: 3,
    title: "TechInsights Platform",
    description: "Content strategy for technology news site establishing authority in emerging tech topics and achieving 1M+ monthly organic page views.",
    image: "/images/projects/techinsights-content.jpg"
  }
];

// Projects for Keyword Research (Service ID: 30)
const keywordResearchProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "CloudSoft Solutions",
    description: "Comprehensive keyword research for cloud software company identifying 500+ high-value keywords and untapped market opportunities worth $2M+ in potential revenue.",
    image: "/images/projects/cloudsoft-keywords.jpg"
  },
  {
    id: 2,
    title: "LocalServices Network",
    description: "Multi-market keyword research for service-based franchise identifying location-specific opportunities and seasonal trends across 50+ markets.",
    image: "/images/projects/localservices-keywords.jpg"
  },
  {
    id: 3,
    title: "EduTech Academy",
    description: "Educational keyword research and analysis for online learning platform discovering high-intent course-related keywords driving 300% enrollment growth.",
    image: "/images/projects/edutech-keywords.jpg"
  }
];

// Projects for SEO Audit (Service ID: 31)
const seoAuditProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "ManufacturingPro Corp",
    description: "Comprehensive SEO audit for industrial manufacturer identifying 150+ technical issues and content gaps, with roadmap leading to 200% organic growth.",
    image: "/images/projects/manufacturingpro-audit.jpg"
  },
  {
    id: 2,
    title: "RetailChain Stores",
    description: "Enterprise SEO audit for retail chain revealing critical technical issues and missed opportunities, resulting in prioritized action plan and quick wins.",
    image: "/images/projects/retailchain-audit.jpg"
  },
  {
    id: 3,
    title: "ServicePro Business",
    description: "Complete SEO audit for professional services firm uncovering competitive gaps and optimization opportunities leading to market leadership positioning.",
    image: "/images/projects/servicepro-audit.jpg"
  }
]
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
  },
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
export const getProjectsByServiceId = (serviceId: number): FeaturedProject[] => {
  const collection = allProjects.find(p => p.serviceId === serviceId);
  return collection ? collection.projects : websiteDesignProjects; // Default to website projects
};

// Background image for the showcase component
export const showcaseBackground = "/images/feature.png";

// Monitor/laptop frame image
export const monitorFrameImage = "/images/ct2.png";