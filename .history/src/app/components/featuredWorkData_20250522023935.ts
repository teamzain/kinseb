export interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Ejil Enterprise",
    description: "For InnovateTech, we engineered and launched a comprehensive web platform. This robust solution significantly enhanced their digital presence for better accessibility and engagement, while critically streamlining internal operations for remarkable improvements in efficiency.",
    image: "/images/ejil-enterprise.png"
  },
  {
    id: 2,
    title: "Quantum Solutions",
    description: "We created a cutting-edge business intelligence dashboard that transformed how Quantum Solutions analyzes customer data. Our interactive visualizations and real-time reporting tools enabled executives to make data-driven decisions faster, leading to a 28% increase in customer retention.",
    image: "/images/quantum-solutions.png"
  },
  {
    id: 3,
    title: "Vertex Media",
    description: "Our team developed a content management system for Vertex Media that simplified their publishing workflow. The custom solution integrated seamlessly with their existing tools while providing advanced analytics and scheduling capabilities, reducing production time by 40%.",
    image: "/images/vertex-media.png"
  },
  {
    id: 4,
    title: "NexGen Healthcare",
    description: "We built a patient management portal for NexGen Healthcare that improved both the patient and provider experience. The HIPAA-compliant solution features secure messaging, appointment scheduling, and medical record access, resulting in higher patient satisfaction and reduced administrative overhead.",
    image: "/images/nexgen-healthcare.png"
  }
];

// Background image for the showcase component
export const showcaseBackground = "/images/feature.png";