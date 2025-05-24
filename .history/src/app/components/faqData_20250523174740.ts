export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface FAQCollection {
  serviceId: number;
  faqs: FAQ[];
}

// FAQs for Website Design (Service ID: 1)
const websiteDesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "What services does Kinseb provide?",
    answer: "Kinseb offers a range of services including design, development, and SEO optimization. We specialize in user experience design, web development, mobile app development, custom software development, branding and identity, and more."
  },
  {
    id: 2,
    question: "Will my website be mobile friendly?",
    answer: "Absolutely! All our websites are built with responsive design principles, ensuring they look and function perfectly on all devices including smartphones, tablets, and desktop computers. We follow mobile-first design approaches to guarantee optimal user experience across all screen sizes."
  },
  {
    id: 3,
    question: "Do you offer website redesign services?",
    answer: "Yes, we provide comprehensive website redesign services. Whether you need a complete overhaul or just want to modernize certain elements, we can help transform your existing website into a modern, high-performing digital presence that aligns with current design trends and best practices."
  },
  {
    id: 4,
    question: "How long does it take to design a website?",
    answer: "The timeline for website design typically ranges from 3-8 weeks, depending on the complexity and scope of the project. Simple websites can be completed in 3-4 weeks, while more complex sites with custom features may take 6-8 weeks. We provide detailed timelines during our initial consultation."
  }
];

// FAQs for Website Redesign Solutions (Service ID: 2)
const websiteredesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "Which platforms do you support for redesigned websites?",
    answer: "We work with all major e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, and custom-built solutions. We help you choose the best platform based on your business needs, budget, and growth plans."
  },
  {
    id: 2,
    question: "Can you integrate modern payment gateways into my redesigned website?",
    answer: "Yes, we integrate secure payment gateways including PayPal, Stripe, Square, and many others. We ensure all transactions are secure with SSL certificates and PCI compliance, giving your customers confidence when making purchases."
  },
  {
    id: 3,
    question: "Will the redesigned site include improved inventory management capabilities?",
    answer: "Absolutely! We integrate advanced inventory management systems that automatically track stock levels, send low-stock alerts, manage suppliers, and sync across multiple sales channels. This helps streamline your operations and prevent overselling."
  },
  {
    id: 4,
    question: "Do you offer ongoing support after the website redesign?",
    answer: "Yes, we provide comprehensive ongoing support including regular updates, security monitoring, performance optimization, backup management, and technical assistance. We offer different support packages to meet your specific needs and budget."
  }
];


// FAQs for Digital Marketing (Service ID: 3)
const digitalMarketingFAQs: FAQ[] = [
  {
    id: 1,
    question: "What digital marketing services do you offer?",
    answer: "We offer comprehensive digital marketing services including SEO, PPC advertising, social media marketing, content marketing, email marketing, conversion rate optimization, and analytics reporting. Our strategies are data-driven and tailored to your specific business goals."
  },
  {
    id: 2,
    question: "How do you measure marketing campaign success?",
    answer: "We use advanced analytics tools to track key performance indicators such as website traffic, conversion rates, click-through rates, return on ad spend (ROAS), and customer acquisition costs. We provide detailed monthly reports showing your campaign performance and ROI."
  },
  {
    id: 3,
    question: "Do you provide social media management?",
    answer: "Yes, we offer full social media management services including content creation, posting schedules, community management, paid social advertising, and performance tracking across all major platforms like Facebook, Instagram, Twitter, LinkedIn, and TikTok."
  },
  {
    id: 4,
    question: "How long before I see marketing results?",
    answer: "Results vary by strategy: PPC campaigns can show immediate traffic, social media engagement typically improves within 2-4 weeks, while SEO results generally take 3-6 months. We set realistic expectations and provide regular updates on progress toward your goals."
  }
];

// Collection of all FAQ sets by service ID
const allFAQs: FAQCollection[] = [
  {
    serviceId: 1,
    faqs: websiteDesignFAQs
  },
  {
    serviceId: 2,
    faqs: websiteredesignFAQs
  },
  {
    serviceId: 3, 
    faqs: digitalMarketingFAQs
  }
];

// Get FAQs for a specific service ID
export const getFAQsByServiceId = (serviceId: number): FAQ[] => {
  const collection = allFAQs.find(f => f.serviceId === serviceId);
  return collection ? collection.faqs : websiteDesignFAQs; // Default to website design FAQs
};

export default allFAQs;