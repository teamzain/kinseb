export interface ServiceData {
  id: string;
  numericId: number;
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

export const developmentServices: ServiceData[] = [
  {
    id: "website-development",
    numericId: 14,
    title: "Website Development",
    description: "Building robust, scalable websites with cutting-edge technology.",
    longDescription: "Our website development services transform designs into fully functional, high-performance websites. We use modern technologies and best practices to create fast, secure, and scalable web solutions that provide exceptional user experiences while being easy to maintain and update.",
    price: "$2,000 - $8,000",
    duration: "4-8 weeks",
    featured: true,
    image: "/images/website-development.jpg",
    bannerImage: "/images/website-development.jpg",
    deliverables: [
      "Fully responsive website development",
      "Cross-browser compatibility testing",
      "Performance optimization and speed enhancement",
      "Content Management System integration",
      "SEO-friendly code structure",
      "Security implementation and SSL setup",
      "Analytics and tracking integration",
      "Documentation and training materials"
    ],
    process: [
      "Technical requirements analysis",
      "Development environment setup",
      "Frontend and backend development",
      "Integration and testing",
      "Performance optimization",
      "Deployment and launch"
    ],
    features: [
      "Modern web technologies",
      "Responsive and mobile-optimized",
      "Fast loading and performance optimized",
      "Secure and reliable architecture",
      "SEO-friendly development",
      "Easy content management"
    ]
  },
  {
    id: "webapp-development",
    numericId: 15,
    title: "Web App Development",
    description: "Creating powerful web applications for complex business needs.",
    longDescription: "We develop sophisticated web applications that handle complex business logic and provide rich user experiences. Our web apps are built with scalable architectures, real-time capabilities, and advanced functionality to support your business operations and user requirements.",
    price: "$5,000 - $25,000",
    duration: "8-16 weeks",
    featured: true,
    image: "/images/webapp-development.jpg",
    bannerImage: "/images/webapp-development.jpg",
    deliverables: [
      "Custom web application development",
      "Database design and implementation",
      "User authentication and authorization",
      "Real-time features and notifications",
      "API development and integration",
      "Admin dashboard and analytics",
      "Automated testing and quality assurance",
      "Deployment and hosting setup"
    ],
    process: [
      "Requirements analysis and planning",
      "System architecture design",
      "Database and backend development",
      "Frontend application development",
      "Integration and testing",
      "Deployment and optimization"
    ],
    features: [
      "Scalable architecture",
      "Real-time functionality",
      "Advanced user management",
      "Custom business logic",
      "API integrations",
      "Performance monitoring"
    ]
  },
  {
    id: "custom-web-development",
    numericId: 16,
    title: "Custom Web Development",
    description: "Tailored web solutions built specifically for your unique requirements.",
    longDescription: "Our custom web development services create bespoke solutions tailored to your specific business needs. We build from scratch using the most appropriate technologies for your requirements, ensuring your web solution is perfectly aligned with your business processes and goals.",
    price: "$4,000 - $20,000",
    duration: "6-14 weeks",
    featured: false,
    image: "/images/custom-web-development.jpg",
    bannerImage: "/images/custom-web-development.jpg",
    deliverables: [
      "Custom-built web solution",
      "Tailored functionality and features",
      "Third-party system integrations",
      "Custom database design",
      "Automated workflows and processes",
      "Custom reporting and analytics",
      "API development for integrations",
      "Comprehensive documentation"
    ],
    process: [
      "Detailed requirements gathering",
      "Custom solution architecture",
      "Agile development methodology",
      "Continuous testing and feedback",
      "Integration and deployment",
      "Training and handover"
    ],
    features: [
      "100% custom-built solution",
      "Tailored to specific requirements",
      "Flexible and extensible",
      "Integration-ready",
      "Scalable architecture",
      "Future-proof technology"
    ]
  },
  {
    id: "ecommerce-development",
    numericId: 17,
    title: "E-commerce Development",
    description: "Building high-converting online stores with advanced functionality.",
    longDescription: "We develop comprehensive e-commerce solutions that drive sales and provide exceptional shopping experiences. Our e-commerce development includes custom features, payment integrations, inventory management, and optimization for conversion and performance.",
    price: "$4,000 - $15,000",
    duration: "6-12 weeks",
    featured: true,
    image: "/images/ecommerce-development.jpg",
    bannerImage: "/images/ecommerce-development.jpg",
    deliverables: [
      "Custom e-commerce platform development",
      "Payment gateway integrations",
      "Inventory management system",
      "Order processing and fulfillment",
      "Customer account management",
      "Shopping cart and checkout optimization",
      "Product catalog and search functionality",
      "Analytics and reporting dashboard"
    ],
    process: [
      "E-commerce strategy and planning",
      "Platform development and setup",
      "Payment and shipping integration",
      "Product catalog implementation",
      "Testing and optimization",
      "Launch and monitoring"
    ],
    features: [
      "Multi-payment gateway support",
      "Advanced inventory management",
      "Mobile-optimized shopping",
      "SEO-friendly structure",
      "Security and compliance",
      "Scalable for growth"
    ]
  },
  {
    id: "shopify-development",
    numericId: 18,
    title: "Shopify Development",
    description: "Expert Shopify store development and customization services.",
    longDescription: "Our Shopify development services leverage the power of the Shopify platform to create beautiful, high-converting online stores. We specialize in custom theme development, app integrations, and advanced Shopify features to maximize your store's potential.",
    price: "$2,500 - $10,000",
    duration: "4-10 weeks",
    featured: false,
    image: "/images/shopify-development.jpg",
    bannerImage: "/images/shopify-development.jpg",
    deliverables: [
      "Custom Shopify theme development",
      "Shopify app integrations",
      "Product catalog setup and optimization",
      "Payment and shipping configuration",
      "Custom functionality development",
      "Shopify Plus advanced features",
      "Performance optimization",
      "Store management training"
    ],
    process: [
      "Shopify store setup and configuration",
      "Custom theme development",
      "App integration and customization",
      "Product and content migration",
      "Testing and optimization",
      "Launch and training"
    ],
    features: [
      "Custom Shopify themes",
      "Advanced app integrations",
      "Mobile-first development",
      "Conversion optimization",
      "Shopify Plus compatibility",
      "Easy store management"
    ]
  },
  {
    id: "wordpress-development",
    numericId: 19,
    title: "WordPress Development",
    description: "Professional WordPress websites with custom functionality.",
    longDescription: "We create powerful WordPress websites that combine ease of use with advanced functionality. Our WordPress development includes custom themes, plugin development, and optimization to deliver fast, secure, and user-friendly websites that are easy to manage.",
    price: "$1,800 - $8,000",
    duration: "3-8 weeks",
    featured: false,
    image: "/images/wordpress-development.jpg",
    bannerImage: "/images/wordpress-development.jpg",
    deliverables: [
      "Custom WordPress theme development",
      "Plugin development and customization",
      "Content management system setup",
      "SEO optimization and configuration",
      "Security hardening and optimization",
      "Performance optimization",
      "Backup and maintenance setup",
      "User training and documentation"
    ],
    process: [
      "WordPress setup and configuration",
      "Custom theme development",
      "Plugin integration and customization",
      "Content migration and setup",
      "Testing and optimization",
      "Launch and training"
    ],
    features: [
      "Custom WordPress themes",
      "Plugin development",
      "Easy content management",
      "SEO-optimized structure",
      "Security best practices",
      "Performance optimized"
    ]
  },
  {
    id: "pos-development",
    numericId: 20,
    title: "POS Development",
    description: "Custom point-of-sale systems for retail and service businesses.",
    longDescription: "We develop custom Point of Sale (POS) systems that streamline your business operations. Our POS solutions include inventory management, sales tracking, customer management, and reporting features tailored to your specific business requirements.",
    price: "$8,000 - $30,000",
    duration: "10-18 weeks",
    featured: false,
    image: "/images/pos-development.jpg",
    bannerImage: "/images/pos-development.jpg",
    deliverables: [
      "Custom POS system development",
      "Inventory management integration",
      "Sales processing and tracking",
      "Customer relationship management",
      "Reporting and analytics dashboard",
      "Payment processing integration",
      "Multi-location support",
      "Staff training and support"
    ],
    process: [
      "Business requirements analysis",
      "POS system architecture design",
      "Core functionality development",
      "Integration and testing",
      "Hardware setup and configuration",
      "Training and deployment"
    ],
    features: [
      "Real-time inventory tracking",
      "Multi-payment support",
      "Customer management",
      "Detailed reporting",
      "Multi-location capable",
      "Hardware integration"
    ]
  },
  {
    id: "custom-software-development",
    numericId: 21,
    title: "Custom Software Development",
    description: "Bespoke software solutions for unique business challenges.",
    longDescription: "We develop custom software solutions that address your specific business challenges and requirements. Our software development process ensures that you get a solution that perfectly fits your workflow, integrates with existing systems, and scales with your business growth.",
    price: "$10,000 - $50,000",
    duration: "12-24 weeks",
    featured: true,
    image: "/images/custom-software-development.jpg",
    bannerImage: "/images/custom-software-development.jpg",
    deliverables: [
      "Custom software application",
      "Database design and implementation",
      "User interface and experience design",
      "System integrations and APIs",
      "Automated testing and quality assurance",
      "Documentation and training materials",
      "Deployment and hosting setup",
      "Ongoing support and maintenance"
    ],
    process: [
      "Requirements analysis and planning",
      "System design and architecture",
      "Agile development methodology",
      "Continuous testing and iteration",
      "Integration and deployment",
      "Training and support"
    ],
    features: [
      "Fully customized solution",
      "Scalable architecture",
      "Integration capabilities",
      "Advanced functionality",
      "Security and compliance",
      "Future-proof technology"
    ]
  },
  {
    id: "backend-api-development",
    numericId: 22,
    title: "Backend & API Development",
    description: "Robust backend systems and APIs that power modern applications.",
    longDescription: "We build powerful backend systems and APIs that serve as the foundation for web applications, mobile apps, and integrations. Our backend development focuses on performance, security, and scalability to ensure your applications run smoothly and efficiently.",
    price: "$6,000 - $25,000",
    duration: "8-16 weeks",
    featured: false,
    image: "/images/backend-api-development.jpg",
    bannerImage: "/images/backend-api-development.jpg",
    deliverables: [
      "RESTful API development",
      "Database design and optimization",
      "Server architecture and setup",
      "Authentication and authorization systems",
      "Data processing and analytics",
      "Third-party service integrations",
      "API documentation and testing",
      "Performance monitoring and optimization"
    ],
    process: [
      "API design and documentation",
      "Database architecture planning",
      "Backend development and testing",
      "Security implementation",
      "Performance optimization",
      "Deployment and monitoring"
    ],
    features: [
      "RESTful API architecture",
      "Scalable backend systems",
      "Database optimization",
      "Security best practices",
      "Real-time capabilities",
      "Integration-ready"
    ]
  }
];

// Updated function to work with string IDs
export const getDevelopmentServiceById = async (id: string): Promise<ServiceData | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = developmentServices.find(s => s.id === id);
      resolve(service || null);
    }, 500);
  });
};

// Helper function to get numeric ID for components that still need it
export const getNumericDevelopmentServiceId = (stringId: string): number => {
  const service = developmentServices.find(s => s.id === stringId);
  return service?.numericId || 14;
};

export default developmentServices;