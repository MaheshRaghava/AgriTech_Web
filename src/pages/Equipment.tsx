
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProductCard, { Product } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingModal from '@/components/equipment/BookingModal';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Updated equipment data with costs in rupees per day
const equipmentData: Product[] = [
  // Tractors
  {
    id: 'eq001',
    name: 'John Deere 5E Series Tractor',
    description: 'Reliable tractor for all farming needs with 55 HP engine.',
    price: 850,
    image: 'https://www.deere.com/assets/images/region-4/products/tractors/utility-tractors/5e-series-utility-tractors/5090e/5090e_utility_tractor_r4f008653_large_f08bd84135dd9da84213f7de615ac51b896228e2.jpg',
    category: 'Equipment',
    subcategory: 'Tractors',
    available: true,
    featured: true,
    type: 'equipment',
    rentalPrice: 850,
    rentalPeriod: 'per day'
  },
  {
    id: 'eq002',
    name: 'Mahindra Yuvo 575 DI Tractor',
    description: '50 HP tractor perfect for small to medium farms.',
    price: 700,
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/3/295389554/NQ/DC/EJ/134104153/mahindra-yuvo-575-di-plus-50-hp-tractor.jpg',
    category: 'Equipment',
    subcategory: 'Tractors',
    available: true,
    featured: false,
    type: 'equipment',
    rentalPrice: 700,
    rentalPeriod: 'per day'
  },
  // Drones
  {
    id: 'eq003',
    name: 'Agricultural Spraying Drone',
    description: 'High-capacity drone for efficient pesticide spraying.',
    price: 1200,
    image: 'https://iotechworld.com/wp-content/uploads/2024/01/Fertilizer-Spraying-Techniques.jpg',
    category: 'Equipment',
    subcategory: 'Drones',
    available: true,
    featured: true,
    type: 'equipment',
    rentalPrice: 1200,
    rentalPeriod: 'per day'
  },
  {
    id: 'eq004',
    name: 'Mapping Drone',
    description: 'Advanced drone for field mapping and crop monitoring.',
    price: 1000,
    image: 'https://pilotinstitute.com/wp-content/uploads/2021/03/Basics-of-Drone-Mapping.jpg',
    category: 'Equipment',
    subcategory: 'Drones',
    available: true,
    featured: false,
    type: 'equipment',
    rentalPrice: 1000,
    rentalPeriod: 'per day'
  },
  // Planters
  {
    id: 'eq005',
    name: 'Precision Seeder',
    description: 'Advanced precision seeder for accurate seed placement.',
    price: 600,
    image: 'https://harvestermachine.com/wp-content/uploads/2020/07/tractor-mounted-corn-seed-planter.jpg',
    category: 'Equipment',
    subcategory: 'Planters',
    available: true,
    featured: true,
    type: 'equipment',
    rentalPrice: 600,
    rentalPeriod: 'per day'
  },
  {
    id: 'eq006',
    name: 'Drum Seeder',
    description: 'Efficient drum seeder for paddy and other crops.',
    price: 400,
    image: 'https://m.media-amazon.com/images/I/61eepD6iaNL.jpg',
    category: 'Equipment',
    subcategory: 'Planters',
    available: true,
    featured: false,
    type: 'equipment',
    rentalPrice: 400,
    rentalPeriod: 'per day'
  },
  // Sprayers
  {
    id: 'eq007',
    name: 'Advanced Sprayer System',
    description: 'High-capacity sprayer for efficient pesticide application.',
    price: 750,
    image: 'https://img.khetivyapar.com/images/blogs/1702368316-drone-spraying-pesticide-wheat-field.jpg',
    category: 'Equipment',
    subcategory: 'Sprayers',
    available: true,
    featured: true,
    type: 'equipment',
    rentalPrice: 750,
    rentalPeriod: 'per day'
  },
  {
    id: 'eq008',
    name: 'Knapsack Sprayer',
    description: 'Portable sprayer perfect for small farms and gardens.',
    price: 150,
    image: 'https://cdn.moglix.com/p/4fbCjJqD4WQ2S-xxlarge.jpg',
    category: 'Equipment',
    subcategory: 'Sprayers',
    available: true,
    featured: false,
    type: 'equipment',
    rentalPrice: 150,
    rentalPeriod: 'per day'
  },
  // Harvesters
  {
    id: 'eq009',
    name: 'Harvester Combine',
    description: 'Efficient combine harvester for wheat and rice.',
    price: 2250,
    image: 'https://mahindrafarmmachinery.com/sites/default/files/2024-12/8.%20Combine%20Harvester%20Working%2C%20Uses%2C%20and%20Importance-min%20%281%29_0.jpg',
    category: 'Equipment',
    subcategory: 'Harvester',
    available: true,
    featured: true,
    type: 'equipment',
    rentalPrice: 2250,
    rentalPeriod: 'per day'
  },
  {
    id: 'eq010',
    name: 'Sugarcane Harvester',
    description: 'Specialized harvester for sugarcane crops.',
    price: 2000,
    image: 'https://iharvester.com/wp-content/uploads/2024/01/John-Deere-Sugarcane-Harvester.jpg',
    category: 'Equipment',
    subcategory: 'Harvester',
    available: true,
    featured: false,
    type: 'equipment',
    rentalPrice: 2000,
    rentalPeriod: 'per day'
  }
];

const Equipment = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [filteredEquipment, setFilteredEquipment] = useState<Product[]>([]);
  const [bookingEquipment, setBookingEquipment] = useState<Product | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  
  // Get unique categories and subcategories
  const categories = Array.from(new Set(equipmentData.map(item => item.category)));
  const getSubcategories = (category: string) => {
    return Array.from(new Set(equipmentData
      .filter(item => item.category === category)
      .map(item => item.subcategory || 'General')
    ));
  };
  
  const subcategories = getSubcategories('Equipment');
  
  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      setFilteredEquipment(equipmentData);
    } else {
      const equipmentInCategory = equipmentData.filter(equipment => equipment.category === selectedCategory);
      
      if (!selectedSubcategory || selectedSubcategory === 'all') {
        setFilteredEquipment(equipmentInCategory);
      } else {
        setFilteredEquipment(equipmentInCategory.filter(equipment => equipment.subcategory === selectedSubcategory));
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
  
  const handleBookEquipment = (equipment: Product) => {
    if (!isAuthenticated) {
      toast.error("Please login to book equipment", {
        description: "You need to be logged in to book equipment.",
        action: {
          label: "Login",
          onClick: () => window.location.href = "/login"
        }
      });
      return;
    }
    
    setBookingEquipment(equipment);
    setIsBookingModalOpen(true);
  };
  
  const handleBookingSubmit = (
    dates: Date[], 
    notes: string, 
    customerName: string, 
    customerEmail: string, 
    customerPhone: string,
    address: string,
    pincode: string
  ) => {
    toast.success("Booking submitted successfully!", {
      description: `Your equipment booking for ${dates.length} days has been received.`
    });
    
    // Store customer email in localStorage for filtering bookings in MyOrders
    localStorage.setItem('userEmail', customerEmail);
    
    setIsBookingModalOpen(false);
  };

  return (
    <MainLayout>
      <section className="py-12 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FEF7CD]/40 rounded-lg shadow-md p-8 mb-10">
            <h1 className="text-4xl font-bold mb-4 text-fern text-left">Equipment Services & Bookings</h1>
            <p className="max-w-3xl text-lg text-gray-600 text-left">
              Access modern farming equipment without the high upfront costs. Browse our selection of high-quality equipment available for booking.
            </p>
          </div>
          
          {/* Category filter buttons styled like Seeds page */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`category-filter-btn ${selectedCategory === 'all' || selectedCategory === '' ? 'active' : ''}`}
            >
              All Equipment
            </button>
            {subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => {
                  handleCategoryChange('Equipment');
                  handleSubcategoryChange(subcategory);
                }}
                className={`category-filter-btn ${selectedSubcategory === subcategory ? 'active' : ''}`}
              >
                {subcategory}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEquipment.map((equipment) => (
              <ProductCard
                key={equipment.id}
                product={equipment}
                onBook={handleBookEquipment}
                showBooking={true}
                showAddToCart={false}
              />
            ))}
          </div>
        </div>
      </section>
      
      {bookingEquipment && (
        <BookingModal
          equipment={bookingEquipment}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </MainLayout>
  );
};

export default Equipment;
