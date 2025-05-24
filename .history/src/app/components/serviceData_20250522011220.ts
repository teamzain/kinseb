'use client';

// Define types for service data
export interface ServiceData {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  featured?: boolean;
  image?: string;
  deliverables: string[];
  process: string[];
}

export interface ServiceDataResponse {
  services: ServiceData[];
}

// Hardcoded service data as a fallback
const fallbackServiceData: ServiceData[] = [
  {
    id: 1,
    title: 'Website Design Services',
    description: 'Creating sleek, strategic websites tailored to your brand.',
    longDescription: 'Our website design services focus on creating visually stunning, functionally superior websites that align perfectly with your brand identity. We combine modern aesthetics with strategic UX principles to ensure your site not only looks great but also drives conversions.',
    price: '$1,500 - $5,000',
    duration: '3-6 weeks',
    featured: true,
    deliverables: [
      'Custom responsive design',
      'User experience strategy',
      'Content strategy consultation',
      'SEO-friendly architecture',
      'Browser compatibility testing'
    ],
    process: [
      'Discovery and strategy',
      'Wireframing',
      'Visual design',
      'Development',
      'Testing and launch'
    ]
  },
  // Add a few more services here as fallback data
  {
    id: 2,
    title: 'Website Redesign',
    description: 'Revamping outdated sites into modern, high-performing platforms.',
    longDescription: 'Transform your outdated website into a modern, high-performing digital platform. Our redesign process begins with a comprehensive analysis of your current site\'s strengths and weaknesses, followed by strategic improvements to aesthetics, functionality, and user experience.',
    price: '$2,000 - $6,000',
    duration: '4-8 weeks',
    deliverables: [
      'Comprehensive site audit',
      'Content migration',
      'New responsive design',
      'Performance optimization',
      'Analytics implementation'
    ],
    process: [
      'Site audit and analysis',
      'Strategy development',
      'Design concepts',
      'Development and migration',
      'Testing and launch'
    ]
  },
  {
    id: 3,
    title: 'Web App Design',
    description: 'Designing intuitive web apps focused on user experience.',
    longDescription: 'We create intuitive, powerful web applications with a focus on exceptional user experiences. Our web app design process integrates sophisticated UI/UX principles with technical feasibility to deliver solutions that are both beautiful and functional.',
    price: '$3,000 - $10,000',
    duration: '6-12 weeks',
    deliverables: [
      'User flow diagrams',
      'Interactive prototypes',
      'UI component library',
      'Design system documentation',
      'Developer handoff assets'
    ],
    process: [
      'Research and requirements gathering',
      'Information architecture',
      'Wireframing and prototyping',
      'Visual design',
      'User testing and refinement'
    ]
  }
];

// Load service data from JSON file with fallback and better error handling
export async function getAllServices(): Promise<ServiceData[]> {
  try {
    // First, attempt to fetch from the json file in the public directory
    const response = await fetch('/data/services.json', {
      // Add cache control for better performance
      next: { revalidate: 3600 }, // Revalidate at most once per hour
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch services: ${response.status} ${response.statusText}`);
      return fallbackServiceData;
    }
    
    try {
      const data: ServiceDataResponse = await response.json();
      return data.services;
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      return fallbackServiceData;
    }
  } catch (fetchError) {
    console.error('Error fetching services data:', fetchError);
    return fallbackServiceData;
  }
}

// Get a single service by ID
export async function getServiceById(id: number): Promise<ServiceData | undefined> {
  try {
    const services = await getAllServices();
    return services.find(service => service.id === id);
  } catch (error) {
    console.error(`Error getting service with id ${id}:`, error);
    // Return the fallback service with matching ID if available
    return fallbackServiceData.find(service => service.id === id);
  }
}