export interface ServiceData {
  id: number;
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
  features: string[]; // Added for the banner component
}

export const services: ServiceData[] = [
  {
    id: 1,
    title: "Website Design",
    description: "We handcraft every website to reflect your vision and values — no templates, no shortcuts. A custom experience that enhances brand recognition and drives real results.",
    longDescription: "Our website design services focus on creating visually stunning, functionally superior websites that align perfectly with your brand identity. We combine modern aesthetics with strategic UX principles to ensure your site not only looks great but also drives conversions.",
    price: "$1,500 - $5,000",
    duration: "3-6 weeks",
    featured: true,
    image: "/images/about-3.jpg",
    bannerImage: "/images/website-mockups.png",
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
    ]
  },
  {
    id: 2,
    title: "E-commerce Solutions",
    description: "Transform your business with a powerful online storefront that drives sales and enhances customer experience.",
    longDescription: "Our e-commerce solutions provide a seamless shopping experience for your customers while giving you powerful tools to manage products, process orders, and analyze sales data. We build custom e-commerce websites that align with your brand and business goals.",
    price: "$3,000 - $10,000",
    duration: "6-10 weeks",
    featured: false,
    image: "/images/ecommerce.jpg",
    bannerImage: "/images/ecommerce-mockups.png",
    deliverables: [
      "Custom e-commerce design",
      "Product catalog setup",
      "Payment gateway integration",
      "Shipping method configuration",
      "Order management system"
    ],
    process: [
      "Business requirements analysis",
      "UX/UI design",
      "E-commerce platform setup",
      "Custom development",
      "Testing and launch"
    ],
    features: [
      "Secure payment processing",
      "Mobile-optimized shopping experience",
      "Inventory management integration"
    ]
  },
  {
    id: 3,
    title: "Digital Marketing",
    description: "Strategic marketing campaigns that increase visibility, drive qualified traffic, and boost conversion rates.",
    longDescription: "Our digital marketing services help you reach your target audience through data-driven strategies across multiple channels. We focus on creating meaningful connections that convert prospects into loyal customers.",
    price: "$1,000 - $3,000/month",
    duration: "Ongoing",
    featured: false,
    image: "/images/digital-marketing.jpg",
    bannerImage: "/images/marketing-mockups.png",
    deliverables: [
      "Marketing strategy development",
      "SEO optimization",
      "Content marketing",
      "Social media management",
      "Analytics and reporting"
    ],
    process: [
      "Audience analysis",
      "Strategy development",
      "Campaign setup",
      "Execution",
      "Performance monitoring"
    ],
    features: [
      "Data-driven campaign optimization",
      "Multi-channel approach",
      "Regular performance reporting"
    ]
  }
];

export const getServiceById = async (id: number): Promise<ServiceData | null> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = services.find(s => s.id === id);
      resolve(service || null);
    }, 500);
  });
};

export default services;