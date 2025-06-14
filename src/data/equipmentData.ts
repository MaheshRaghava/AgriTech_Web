
export interface Equipment {
  id: string;
  name: string;
  description: string;
  price: number;
  rentalPrice: number;
  rentalPeriod: string;
  category: string;
  subcategory?: string;
  image: string;
  specifications: string[];
  available: boolean;
  featured: boolean;
  type: 'equipment' | 'seed' | 'pesticide' | 'tool';
}

export const equipmentData: Equipment[] = [
  {
    id: "001",
    name: "Modern Tractor",
    description: "High-performance tractor with advanced features for efficient farming operations.",
    price: 2500000,
    rentalPrice: 3000,
    rentalPeriod: "per day",
    category: "Heavy Machinery",
    subcategory: "Tractors",
    image: "https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg",
    specifications: [
      "120 HP Engine",
      "4-Wheel Drive",
      "Climate-Controlled Cabin",
      "GPS Navigation System",
      "Automatic Transmission"
    ],
    available: true,
    featured: true,
    type: "equipment"
  },
  {
    id: "002",
    name: "Smart Irrigation System",
    description: "Automated irrigation system with sensors to optimize water usage based on soil conditions.",
    price: 150000,
    rentalPrice: 1500,
    rentalPeriod: "per week",
    category: "Irrigation",
    subcategory: "Smart Systems",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad92c",
    specifications: [
      "Soil Moisture Sensors",
      "Weather Integration",
      "Mobile App Control",
      "Water Usage Analytics",
      "Multiple Zone Control"
    ],
    available: true,
    featured: true,
    type: "equipment"
  },
  {
    id: "003",
    name: "Precision Planter",
    description: "Advanced planter for precise seed placement with variable rate technology.",
    price: 850000,
    rentalPrice: 2500,
    rentalPeriod: "per day",
    category: "Planting Equipment",
    subcategory: "Planters",
    image: "https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg",
    specifications: [
      "Variable Rate Technology",
      "Down-Force Control",
      "Row-by-Row Control",
      "GPS Integration",
      "Real-time Monitoring"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "004",
    name: "Harvester Combine",
    description: "Modern combine harvester with high capacity and efficiency for multiple crop types.",
    price: 3500000,
    rentalPrice: 4000,
    rentalPeriod: "per day",
    category: "Harvesting Equipment",
    subcategory: "Harvesters",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad92c",
    specifications: [
      "350 HP Engine",
      "30-foot Header",
      "Automated Controls",
      "Yield Monitoring",
      "Climate-Controlled Cabin"
    ],
    available: true,
    featured: true,
    type: "equipment"
  },
  {
    id: "005",
    name: "Agricultural Drone",
    description: "High-tech drone for field scouting, crop monitoring, and precision spraying.",
    price: 350000,
    rentalPrice: 1200,
    rentalPeriod: "per week",
    category: "Precision Technology",
    subcategory: "Drones",
    image: "https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg",
    specifications: [
      "4K Camera",
      "Thermal Imaging",
      "30-minute Flight Time",
      "Autonomous Flight Paths",
      "Spraying Capability (10L)"
    ],
    available: true,
    featured: true,
    type: "equipment"
  },
  {
    id: "006",
    name: "Soil Testing Kit",
    description: "Comprehensive soil analysis kit with digital readings and smartphone integration.",
    price: 75000,
    rentalPrice: 500,
    rentalPeriod: "per week",
    category: "Testing Equipment",
    subcategory: "Soil Analysis",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad92c",
    specifications: [
      "NPK Analysis",
      "pH Testing",
      "Moisture Sensing",
      "Temperature Monitoring",
      "Mobile App Integration"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "007",
    name: "Smart Greenhouse System",
    description: "Automated greenhouse control system for climate, irrigation, and nutrient management.",
    price: 500000,
    rentalPrice: 3000,
    rentalPeriod: "per month",
    category: "Protected Cultivation",
    subcategory: "Greenhouses",
    image: "https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg",
    specifications: [
      "Climate Control",
      "Automated Irrigation",
      "Nutrient Dosing",
      "Remote Monitoring",
      "Energy Efficiency Features"
    ],
    available: false,
    featured: true,
    type: "equipment"
  },
  {
    id: "008",
    name: "Seed Drill",
    description: "Precision seed drill for accurate seed placement and spacing.",
    price: 450000,
    rentalPrice: 1500,
    rentalPeriod: "per day",
    category: "Planting Equipment",
    subcategory: "Seed Drills",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad92c",
    specifications: [
      "24-Row Configuration",
      "Variable Depth Control",
      "Electronic Seed Metering",
      "Row Markers",
      "Hydraulic Folding"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "009",
    name: "Tractor Attachment Kit",
    description: "Versatile attachment kit for tractors to perform multiple farming operations.",
    price: 180000,
    rentalPrice: 1000,
    rentalPeriod: "per week",
    category: "Heavy Machinery",
    subcategory: "Attachments",
    image: "https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg",
    specifications: [
      "Multiple Tool Options",
      "Quick Connect System",
      "Heavy-Duty Construction",
      "Universal Compatibility",
      "Tool Storage Rack"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "010",
    name: "Drip Irrigation System",
    description: "Water-efficient irrigation system for precise water delivery to plant roots.",
    price: 120000,
    rentalPrice: 800,
    rentalPeriod: "per month",
    category: "Irrigation",
    subcategory: "Drip Systems",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad92c",
    specifications: [
      "Water-Efficient Design",
      "Pressure-Compensating Emitters",
      "Filtration System",
      "Easy Installation",
      "Modular Components"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  // Additional items to ensure each category has at least two subcategories
  {
    id: "011",
    name: "Mini Tractor",
    description: "Compact and versatile tractor for small farms and specialized tasks.",
    price: 1200000,
    rentalPrice: 1800,
    rentalPeriod: "per day",
    category: "Heavy Machinery",
    subcategory: "Mini Tractors",
    image: "https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg",
    specifications: [
      "60 HP Engine",
      "Compact Design",
      "Versatile Attachments",
      "Fuel Efficient",
      "Easy Maintenance"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "012",
    name: "Grain Harvester",
    description: "Specialized harvester for grain crops with high efficiency and low grain loss.",
    price: 2800000,
    rentalPrice: 3500,
    rentalPeriod: "per day",
    category: "Harvesting Equipment",
    subcategory: "Grain Harvesters",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad92c",
    specifications: [
      "280 HP Engine",
      "Large Grain Tank",
      "Advanced Threshing System",
      "GPS Guidance",
      "Yield Mapping"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "013",
    name: "Water Quality Tester",
    description: "Advanced water quality testing equipment for irrigation water analysis.",
    price: 85000,
    rentalPrice: 600,
    rentalPeriod: "per week",
    category: "Testing Equipment",
    subcategory: "Water Analysis",
    image: "https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg",
    specifications: [
      "pH Monitoring",
      "TDS Measurement",
      "Contaminant Detection",
      "Digital Display",
      "Smartphone Integration"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "014",
    name: "Ground Sensors Network",
    description: "Network of in-field sensors for comprehensive field monitoring.",
    price: 280000,
    rentalPrice: 1500,
    rentalPeriod: "per month",
    category: "Precision Technology",
    subcategory: "Field Sensors",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad92c",
    specifications: [
      "Moisture Sensors",
      "Temperature Sensors",
      "Solar Powered",
      "Wireless Network",
      "Cloud Data Storage"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "015",
    name: "Polyhouse System",
    description: "Advanced polyhouse system for year-round cultivation in controlled environment.",
    price: 450000,
    rentalPrice: 2500,
    rentalPeriod: "per month",
    category: "Protected Cultivation",
    subcategory: "Polyhouses",
    image: "https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg",
    specifications: [
      "UV Stabilized Film",
      "Temperature Control",
      "Humidity Regulation",
      "Automated Ventilation",
      "Drip Irrigation Integration"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "016",
    name: "Precision Cultivator",
    description: "Modern cultivator for precise weed management and soil preparation.",
    price: 320000,
    rentalPrice: 1200,
    rentalPeriod: "per day",
    category: "Planting Equipment",
    subcategory: "Cultivators",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad92c",
    specifications: [
      "GPS Guided Operation",
      "Adjustable Working Width",
      "Hydraulic Depth Control",
      "Camera-Based Guidance",
      "Real-time Monitoring"
    ],
    available: true,
    featured: false,
    type: "equipment"
  },
  {
    id: "017",
    name: "Sprinkler Irrigation Kit",
    description: "Complete sprinkler irrigation system for medium to large fields.",
    price: 180000,
    rentalPrice: 1200,
    rentalPeriod: "per week",
    category: "Irrigation",
    subcategory: "Sprinkler Systems",
    image: "https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg",
    specifications: [
      "Wide Coverage",
      "Adjustable Water Flow",
      "Weather Resistant Design",
      "Easy Assembly",
      "Portable Components"
    ],
    available: true,
    featured: false,
    type: "equipment"
  }
];

export const getEquipmentById = (id: string): Equipment | undefined => {
  return equipmentData.find(item => item.id === id);
};

export const getFeaturedEquipment = (): Equipment[] => {
  return equipmentData.filter(item => item.featured);
};

export const getAvailableEquipment = (): Equipment[] => {
  return equipmentData.filter(item => item.available);
};

export const getSubcategoriesByCategory = (category: string): string[] => {
  const equipmentInCategory = equipmentData.filter(item => item.category === category);
  const subcategories = equipmentInCategory.map(item => item.subcategory || 'General');
  return Array.from(new Set(subcategories));
};
