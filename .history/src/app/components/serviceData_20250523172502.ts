export interface ServiceData {
  id: string; // Changed from number to string
  numericId: number; // Keep for backward compatibility
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  featured: boolean;
  image: string;
  bannerImage: string;
  deliverables: string[];
  process: string[];
  features: string[];
  faq?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export const services: ServiceData[] = [
  {
    id: "website-design-services",
    numericId: 1,
    title: "Website Design Services",
    description: "Creating sleek, strategic websites tailored to your brand.",
    longDescription: "Our website design services focus on creating visually stunning, functionally superior websites that align perfectly with your brand identity. We combine modern aesthetics with strategic UX principles to ensure your site not only looks great but also drives conversions.",
    price: "$1,500 - $5,000",
    duration: "3-6 weeks",
    featured: true,
    image: "/images/website-design.jpg",
    bannerImage: "/images/website-design.jpg",
    deliverables: [
      "Custom responsive design",
      "User experience strategy",
      "Content strategy consultation",
      "SEO-friendly architecture",
      "Browser compatibility testing"
    ],
    process: [
      "Discovery and strategy",
      "Wireframing",
      "Visual design",
      "Development",
      "Testing and launch"
    ],
    features: [
      "100% custom, no cookie-cutter layouts",
      "Designed for conversion & engagement",
      "Strengthens your brand's digital identity"
    ],
    faq: [
      {
        id: "section1",
        title: "Custom Web Design",
        description: "Our expert designers create custom websites with tailored UX/UI and SEO to drive traffic and conversions. We build unique designs featuring branded animations for enhanced visibility and engagement."
      },
      {
        id: "section2",
        title: "Custom Web Design",
        description: "Our expert designers create custom websites with tailored UX/UI and SEO to drive traffic and conversions. We build unique designs featuring branded animations for enhanced visibility and engagement."
      },
      {
        id: "section3",
        title: "Website Redesign",
        description: "Refresh your existing website with modern design principles, improved user experience, and enhanced performance to attract and retain more visitors."
      },
      {
        id: "section4",
        title: "eCommerce Web Design",
        description: "Create conversion-focused online stores with intuitive product navigation, secure checkout processes, and mobile-responsive designs that drive sales."
      }
    ]
  },
  {
    id: "website-redesign",
    numericId: 2,
    title: "Website Redesign",
    description: "Revamping outdated sites into modern, high-performing platforms.",
    longDescription: "Transform your outdated website into a modern, high-performing digital platform. Our redesign process begins with a comprehensive analysis of your current site's strengths and weaknesses, followed by strategic improvements to aesthetics, functionality, and user experience.",
    price: "$2,000 - $6,000",
    duration: "4-8 weeks",
    featured: false,
    image: "/images/website-redesign.jpg",
    bannerImage: "/images/website-redesign.jpg",
    deliverables: [
      "Comprehensive site audit",
      "Content migration",
      "New responsive design",
      "Performance optimization",
      "Analytics implementation"
    ],
    process: [
      "Site audit and analysis",
      "Strategy development",
      "Design concepts",
      "Development and migration",
      "Testing and launch"
    ],
    features: [
      "Modern design principles",
      "Performance optimization",
      "Enhanced user experience"
    ],
    faq: [
      {
        id: "section1",
        title: "Custom Web Design",
        description: "We transform outdated websites into modern, high-performing digital platforms with a comprehensive redesign strategy focused on user experience and conversion optimization."
      },
      {
        id: "section2",
        title: "Custom Web Design",
        description: "Our website redesign process analyzes your current site's strengths and weaknesses, implementing strategic improvements that enhance both aesthetics and functionality."
      },
      {
        id: "section3",
        title: "Website Redesign",
        description: "Refresh your existing website with modern design principles, improved user experience, and enhanced performance to attract and retain more visitors."
      },
      {
        id: "section4",
        title: "eCommerce Web Design",
        description: "Create conversion-focused online stores with intuitive product navigation, secure checkout processes, and mobile-responsive designs that drive sales."
      }
    ]
  },
  {
    id: "web-app-design",
    numericId: 3,
    title: "Web App Design",
    description: "Designing intuitive web apps focused on user experience.",
    longDescription: "We create intuitive, powerful web applications with a focus on exceptional user experiences. Our web app design process integrates sophisticated UI/UX principles with technical feasibility to deliver solutions that are both beautiful and functional.",
    price: "$3,000 - $10,000",
    duration: "6-12 weeks",
    featured: false,
    image: "/images/web-app-design.jpg",
    bannerImage: "/images/web-app-design.jpg",
    deliverables: [
      "User flow diagrams",
      "Interactive prototypes",
      "UI component library",
      "Design system documentation",
      "Developer handoff assets"
    ],
    process: [
      "Research and requirements gathering",
      "Information architecture",
      "Wireframing and prototyping",
      "Visual design",
      "User testing and refinement"
    ],
    features: [
      "Intuitive user interfaces",
      "Interactive prototypes",
      "Scalable design systems"
    ],
    faq: [
      {
        id: "section1",
        title: "Custom Web Design",
        description: "We create intuitive, powerful web applications that seamlessly blend sophisticated UI/UX principles with technical feasibility, delivering solutions that are both beautiful and functional."
      },
      {
        id: "section2",
        title: "Custom Web Design",
        description: "Our web app design process integrates user research, information architecture, and interactive prototyping to create engaging digital experiences that solve complex problems."
      },
      {
        id: "section3",
        title: "Website Redesign",
        description: "Refresh your existing web application with modern design principles, improved user experience, and enhanced performance to attract and retain more users."
      },
      {
        id: "section4",
        title: "eCommerce Web Design",
        description: "Create conversion-focused online stores with intuitive product navigation, secure checkout processes, and mobile-responsive designs that drive sales."
      }
    ]
  },
  {
    id: "mobile-app-design",
    numericId: 4,
    title: "Mobile App Design",
    description: "Crafting beautiful, functional apps for mobile-first users.",
    longDescription: "Our mobile app design services focus on creating engaging, intuitive experiences for iOS and Android platforms. We emphasize performance, usability, and delight to ensure your app stands out in crowded marketplaces while delivering genuine value to users.",
    price: "$3,500 - $12,000",
    duration: "6-14 weeks",
    featured: false,
    image: "/images/mobile-app-design.jpg",
    bannerImage: "/images/mobile-app-design.jpg",
    deliverables: [
      "Platform-specific UI designs",
      "Interactive prototypes",
      "Animation specifications",
      "Design system",
      "Developer-ready assets"
    ],
    process: [
      "Market research",
      "User journey mapping",
      "Wireframing",
      "UI design",
      "Prototype testing",
      "Refinement"
    ],
    features: [
      "Cross-platform compatibility",
      "Intuitive mobile interactions",
      "Performance optimized"
    ],
    faq: [
      {
        id: "section1",
        title: "Custom Web Design",
        description: "Our mobile app design services create engaging, intuitive experiences for iOS and Android platforms that emphasize performance, usability, and delight."
      },
      {
        id: "section2",
        title: "Custom Web Design",
        description: "We design mobile applications that stand out in crowded marketplaces while delivering genuine value to users through thoughtful interaction design and visual appeal."
      },
      {
        id: "section3",
        title: "Website Redesign",
        description: "Refresh your existing mobile application with modern design principles, improved user experience, and enhanced performance to attract and retain more users."
      },
      {
        id: "section4",
        title: "eCommerce Web Design",
        description: "Create conversion-focused mobile shopping experiences with intuitive product navigation, secure checkout processes, and responsive designs that drive sales."
      }
    ]
  },
  {
    id: "branding",
    numericId: 5,
    title: "Branding",
    description: "Building powerful brand identities that truly connect.",
    longDescription: "Our comprehensive branding services help establish meaningful connections between your business and your audience. We develop cohesive brand identities that communicate your values, differentiate you from competitors, and build lasting impressions with your target market.",
    price: "$2,500 - $8,000",
    duration: "4-8 weeks",
    featured: false,
    image: "/images/branding.jpg",
    bannerImage: "/images/branding.jpg",
    deliverables: [
      "Brand strategy document",
      "Logo design",
      "Color palette",
      "Typography system",
      "Brand guidelines",
      "Stationery design"
    ],
    process: [
      "Discovery and research",
      "Strategy development",
      "Visual identity creation",
      "Applications and guidelines",
      "Brand launch support"
    ],
    features: [
      "Strategic brand positioning",
      "Comprehensive visual identity",
      "Lasting market impression"
    ],
    faq: [
      {
        id: "section1",
        title: "Custom Web Design",
        description: "Our comprehensive branding services establish meaningful connections between your business and audience through cohesive brand identities that communicate your values."
      },
      {
        id: "section2",
        title: "Custom Web Design",
        description: "We develop strategic brand systems that differentiate you from competitors and build lasting impressions with your target market through consistent visual and verbal identity."
      },
      {
        id: "section3",
        title: "Website Redesign",
        description: "Refresh your existing brand with modern design principles, improved market positioning, and enhanced visual identity to attract and retain more customers."
      },
      {
        id: "section4",
        title: "eCommerce Web Design",
        description: "Create conversion-focused brand experiences for e-commerce that strengthen customer loyalty and drive sales through cohesive visual identities."
      }
    ]
  },
  {
    id: "ui-ux-design",
    numericId: 13,
    title: "UI/UX Design",
    description: "Creating intuitive interfaces that delight users and drive engagement.",
    longDescription: "Our UI/UX design services focus on creating intuitive, enjoyable digital experiences that satisfy users and achieve business goals. We combine user research, interaction design, and visual aesthetics to build interfaces that feel natural, efficient, and delightful.",
    price: "$2,500 - $9,000",
    duration: "4-10 weeks",
    featured: true,
    image: "/images/ui-ux-design.jpg",
    bannerImage: "/images/ui-ux-design.jpg",
    deliverables: [
      "User research findings",
      "Information architecture",
      "Wireframes",
      "Interactive prototypes",
      "UI design system",
      "Usability testing reports"
    ],
    process: [
      "User research",
      "Information architecture",
      "Wireframing",
      "Prototyping",
      "Visual design",
      "Usability testing"
    ],
    features: [
      "Research-driven design",
      "Intuitive user interfaces",
      "Data-backed decisions"
    ],
    faq: [
      {
        id: "section1",
        title: "Custom Web Design",
        description: "Our UI/UX design services focus on creating intuitive, enjoyable digital experiences that satisfy users and achieve business goals through research-driven design."
      },
      {
        id: "section2",
        title: "Custom Web Design",
        description: "We combine user research, interaction design, and visual aesthetics to build interfaces that feel natural, efficient, and delightful for all users."
      },
      {
        id: "section3",
        title: "Website Redesign",
        description: "Refresh your existing digital interfaces with modern UX principles, improved usability, and enhanced interaction design to increase user satisfaction."
      },
      {
        id: "section4",
        title: "eCommerce Web Design",
        description: "Create conversion-focused UX/UI for e-commerce that simplifies product discovery, streamlines checkout flows, and enhances overall shopping experiences."
      }
    ]
  },
  {
    id: "ecommerce-web-design",
    numericId: 12,
    title: "eCommerce Web Design",
    description: "Driving sales with stunning, conversion-focused store designs.",
    longDescription: "We design e-commerce experiences that balance aesthetic appeal with proven conversion principles. Our e-commerce design services focus on creating trustworthy, user-friendly online stores that guide visitors smoothly from product discovery to purchase completion.",
    price: "$3,000 - $12,000",
    duration: "6-12 weeks",
    featured: false,
    image: "/images/ecommerce-design.jpg",
    bannerImage: "/images/ecommerce-design.jpg",
    deliverables: [
      "Conversion-optimized store design",
      "Product catalog setup",
      "Payment gateway integration",
      "Shipping configuration",
      "Inventory management system",
      "Analytics implementation"
    ],
    process: [
      "E-commerce strategy",
      "Platform selection",
      "UX/UI design",
      "Development and integration",
      "Product upload",
      "Testing and launch"
    ],
    features: [
      "Conversion optimization",
      "Secure payment processing",
      "Mobile-first design"
    ],
    faq: [
      {
        id: "section1",
        title: "Custom Web Design",
        description: "We design e-commerce experiences that balance aesthetic appeal with proven conversion principles to transform visitors into loyal customers."
      },
      {
        id: "section2",
        title: "Custom Web Design",
        description: "Our e-commerce design services focus on creating trustworthy, user-friendly online stores that guide visitors smoothly from product discovery to purchase completion."
      },
      {
        id: "section3",
        title: "Website Redesign",
        description: "Refresh your existing online store with modern design principles, improved conversion pathways, and enhanced product showcases to increase sales."
      },
      {
        id: "section4",
        title: "eCommerce Web Design",
        description: "Create conversion-focused online stores with intuitive product navigation, secure checkout processes, and mobile-responsive designs that drive sales."
      }
    ]
  }
];

// Updated function to work with string IDs
export const getServiceById = async (id: string): Promise<ServiceData | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = services.find(s => s.id === id);
      resolve(service || null);
    }, 500);
  });
};

// Helper function to get numeric ID for components that still need it
export const getNumericServiceId = (stringId: string): number => {
  const service = services.find(s => s.id === stringId);
  return service?.numericId || 1;
};

export default services;