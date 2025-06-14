import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProductCard, { Product } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Hand } from 'lucide-react';

// Smart Tools data with proper typing
const smartToolsData: Product[] = [
  // Sensors
  {
    id: 'st001',
    name: 'Soil Moisture Sensor',
    description: 'Monitor soil moisture levels in real-time for optimal irrigation.',
    price: 250,
    image: 'https://arduinointro.com/images/soilmoisture/soil-moisture-module-probe-connection.jpg',
    category: 'Smart Tools',
    subcategory: 'Sensors',
    available: true,
    featured: true,
    type: 'tool' as const
  },
  {
    id: 'st002',
    name: 'Temperature & Humidity Sensor',
    description: 'Track environmental conditions for better crop management.',
    price: 180,
    image: 'https://5.imimg.com/data5/QU/AU/MY-9380557/dht-11-temperature-humidity-sensor-module.jpg',
    category: 'Smart Tools',
    subcategory: 'Sensors',
    available: true,
    featured: false,
    type: 'tool' as const
  },
  // Irrigation
  {
    id: 'st003',
    name: 'Automated Irrigation Controller',
    description: 'Smart irrigation system with automated scheduling and control.',
    price: 850,
    image: 'https://www.gvsprinklers.com.au/wp-content/uploads/2018/03/irrigation.jpg',
    category: 'Smart Tools',
    subcategory: 'Irrigation',
    available: true,
    featured: true,
    type: 'tool' as const
  },
  {
    id: 'st004',
    name: 'Drip Irrigation System',
    description: 'Efficient water delivery system for precise irrigation.',
    price: 600,
    image: 'https://www.rivulis.com/wp-content/uploads/2023/11/r4d001966-1330x887-694a784e-2cad-4acf-8984-ce44136af95a.jpg',
    category: 'Smart Tools',
    subcategory: 'Irrigation',
    available: true,
    featured: false,
    type: 'tool' as const
  },
  // Drones
  {
    id: 'st005',
    name: 'Drone Crop Monitoring',
    description: 'Advanced drone for crop surveillance and health monitoring.',
    price: 2200,
    image: 'https://stellarix.com/wp-content/uploads/2024/06/Drones-in-Agriculture-1.jpg',
    category: 'Smart Tools',
    subcategory: 'Drones',
    available: true,
    featured: true,
    type: 'tool' as const
  },
  {
    id: 'st006',
    name: 'Drone Spraying System',
    description: 'Precision spraying drone for efficient pesticide application.',
    price: 2800,
    image: 'https://blog.fenstermaker.com/wp-content/uploads/2022/11/Agriculture-Drone-1200x628.jpg',
    category: 'Smart Tools',
    subcategory: 'Drones',
    available: true,
    featured: false,
    type: 'tool' as const
  },
  // Weather
  {
    id: 'st007',
    name: 'Weather Station',
    description: 'Complete weather monitoring system for farm management.',
    price: 1200,
    image: 'https://www.renkeer.com/wp-content/uploads/2021/06/agricultural-weather-station-1.jpg',
    category: 'Smart Tools',
    subcategory: 'Weather',
    available: true,
    featured: true,
    type: 'tool' as const
  },
  {
    id: 'st008',
    name: 'Rain Gauge Sensor',
    description: 'Accurate rainfall measurement for irrigation planning.',
    price: 120,
    image: 'https://www.niubol.com/static/upload/image/20220525/1653463018105398.jpg',
    category: 'Smart Tools',
    subcategory: 'Weather',
    available: true,
    featured: false,
    type: 'tool' as const
  },
  // Mapping
  {
    id: 'st009',
    name: 'GPS Field Mapper',
    description: 'Precision GPS mapping tool for field boundary management.',
    price: 950,
    image: 'https://www.gpsworld.com/wp-content/uploads/2022/07/Trimble-TDC650_General_0020_edit_gradient-F.jpg',
    category: 'Smart Tools',
    subcategory: 'Mapping',
    available: true,
    featured: true,
    type: 'tool' as const
  },
  {
    id: 'st010',
    name: 'GIS Mapping Software',
    description: 'Geographic Information System for comprehensive farm mapping.',
    price: 450,
    image: 'https://static.wixstatic.com/media/5d1736_9295825a5090413a89d644ca801818cb~mv2.jpg/v1/fill/w_708,h_867,al_c,q_85,enc_avif,quality_auto/5d1736_9295825a5090413a89d644ca801818cb~mv2.jpg',
    category: 'Smart Tools',
    subcategory: 'Mapping',
    available: true,
    featured: false,
    type: 'tool' as const
  },
  // Greenhouse
  {
    id: 'st011',
    name: 'Smart Greenhouse Controller',
    description: 'Automated greenhouse environment control system.',
    price: 1500,
    image: 'https://terraconnect.io/wp-content/uploads/2024/01/MicrosoftTeams-image-129.jpg',
    category: 'Smart Tools',
    subcategory: 'Greenhouse',
    available: true,
    featured: true,
    type: 'tool' as const
  },
  {
    id: 'st012',
    name: 'Climate Monitoring System',
    description: 'Comprehensive climate tracking for optimal growing conditions.',
    price: 800,
    image: 'https://www.benchmarklabs.com/wp-content/uploads/2021/12/IoT-Based-Weather-Monitoring-System-For-Micro-Climate-Forecasting.jpg',
    category: 'Smart Tools',
    subcategory: 'Greenhouse',
    available: true,
    featured: false,
    type: 'tool' as const
  }
];

const SmartTools = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [filteredTools, setFilteredTools] = useState<Product[]>([]);
  const { isAuthenticated } = useAuth();
  const { addItemToCart } = useCart();
  const { translate } = useLanguage();
  
  // Get unique categories and subcategories
  const categories = Array.from(new Set(smartToolsData.map(item => item.category)));
  const getSubcategories = (category: string) => {
    return Array.from(new Set(smartToolsData
      .filter(item => item.category === category)
      .map(item => item.subcategory || 'General')
    ));
  };
  
  const subcategories = getSubcategories('Smart Tools');
  
  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      setFilteredTools(smartToolsData);
    } else {
      const toolsInCategory = smartToolsData.filter(tool => tool.category === selectedCategory);
      
      if (!selectedSubcategory || selectedSubcategory === 'all') {
        setFilteredTools(toolsInCategory);
      } else {
        setFilteredTools(toolsInCategory.filter(tool => tool.subcategory === selectedSubcategory));
      }
    }
  }, [selectedCategory, selectedSubcategory]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
  };
  
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };
  
  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart", {
        description: "You need to be logged in to add items to your cart.",
        action: {
          label: "Login",
          onClick: () => window.location.href = "/login"
        }
      });
      return;
    }
    
    addItemToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <MainLayout>
      <section className="py-12 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FEF7CD]/40 rounded-lg shadow-md p-8 mb-10">
            <h1 className="text-4xl font-bold mb-4 text-fern text-left">Smart Tools</h1>
            <p className="max-w-3xl text-lg text-gray-600 text-left">
              Discover cutting-edge smart farming tools designed to optimize your agricultural operations and increase productivity.
            </p>
          </div>
          
          {/* Category filter buttons */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`category-filter-btn ${selectedCategory === 'all' || selectedCategory === '' ? 'active' : ''}`}
            >
              All Smart Tools
            </button>
            {subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => {
                  handleCategoryChange('Smart Tools');
                  handleSubcategoryChange(subcategory);
                }}
                className={`category-filter-btn ${selectedSubcategory === subcategory ? 'active' : ''}`}
              >
                {subcategory}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <ProductCard
                key={tool.id}
                product={tool}
                showAddToCart={true}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold mb-6 text-fern">
                Benefits of Smart Farming Tools
              </h2>
              <p className="text-gray-600 mb-6">
                Implementing smart farming techniques brings numerous advantages to both small-scale and commercial farmers.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-vista-blue flex-shrink-0">
                    <Hand className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-fern">Increased Productivity</h4>
                    <p className="text-gray-600">
                      Smart farming technologies can increase crop yields by up to 70% through optimized resource management.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-vista-blue flex-shrink-0">
                    <Hand className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-fern">Resource Optimization</h4>
                    <p className="text-gray-600">
                      Reduce water usage by 30% and fertilizer application by 20% through precision agriculture techniques.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-vista-blue flex-shrink-0">
                    <Hand className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-fern">Cost Reduction</h4>
                    <p className="text-gray-600">
                      Lower operational costs by implementing equipment sharing and smart resource management.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-vista-blue flex-shrink-0">
                    <Hand className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-fern">Environmental Protection</h4>
                    <p className="text-gray-600">
                      Minimize environmental impact through sustainable farming practices and reduced chemical usage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="bg-fern hover:bg-farm-600 text-white">
                  Discover Our Smart Tools
                </Button>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="https://d17ocfn2f5o4rl.cloudfront.net/wp-content/uploads/2023/07/BP-AI-in-Agriculture-The-Future-of-Farming_body-im-3.jpg" 
                alt="Smart farming technology in action" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                style={{height: "500px"}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Smart Farming Ecosystem */}
      <section className="py-16 bg-[#f0f8f0]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#f0f8f0] rounded-lg shadow-lg p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-fern">
              Smart Farming Ecosystem
            </h2>
            <p className="text-xl mb-8 text-farm-900 max-w-3xl mx-auto">
              Our integrated smart farming ecosystem connects all your agricultural tools and data sources for comprehensive farm management and optimization.
            </p>
            
            <div className="mb-8">
              <img 
                src="https://www.intuity.de/services/smart-tools/intuity-services-smart-tools-parts-header-faded.jpg" 
                alt="Smart farming ecosystem integration" 
                className="rounded-lg shadow-lg mx-auto max-w-full h-auto"
                style={{maxHeight: "400px"}}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-farm-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-fern">Connected Devices</h3>
                <p className="text-gray-700">
                  All your smart tools communicate seamlessly to provide comprehensive farm insights.
                </p>
              </div>
              
              <div className="p-6 bg-farm-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-fern">Centralized Control</h3>
                <p className="text-gray-700">
                  Manage all your farming operations from a single, intuitive dashboard interface.
                </p>
              </div>
              
              <div className="p-6 bg-farm-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-fern">Predictive Analytics</h3>
                <p className="text-gray-700">
                  Use machine learning to predict optimal planting, harvesting, and maintenance schedules.
                </p>
              </div>
            </div>
            
            <Button className="bg-fern hover:bg-farm-600 text-white">
              Explore Integration Options
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SmartTools;
