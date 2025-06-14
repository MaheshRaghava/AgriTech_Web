import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProductCard, { Product } from '@/components/product/ProductCard';

// Mock data for pesticides
const pesticidesData: Product[] = [
  {
    id: 'p1',
    name: 'Organic Neem Oil',
    description: 'Natural pesticide effective against a wide range of pests. Safe for organic farming.',
    price: 350,
    image: 'https://m.media-amazon.com/images/I/71CMEY9x-FL.jpg',
    available: true,
    type: 'pesticide',
    category: 'organic'
  },
  {
    id: 'p2',
    name: 'BioControl Fungi',
    description: 'Biological fungicide that controls soil-borne diseases in crops.',
    price: 450,
    image: 'https://5.imimg.com/data5/XG/WK/CK/SELLER-1051022/trichoooderma-viride-500x500.jpg',
    available: true,
    type: 'pesticide',
    category: 'biological'
  },
  {
    id: 'p3',
    name: 'Pyrethrum Extract',
    description: 'Natural insecticide derived from chrysanthemum flowers. Quick knockdown effect on various insects.',
    price: 400,
    image: 'https://images.jdmagicbox.com/rep/b2b/pyrethrum-extract/pyrethrum-extract-1.jpg',
    available: true,
    type: 'pesticide',
    category: 'organic'
  },
  {
    id: 'p4',
    name: 'Copper Fungicide',
    description: 'Effective against fungal diseases in fruits and vegetables. Protects plants from blights and mildews.',
    price: 380,
    image: 'https://files.plytix.com/api/v1.1/file/public_files/pim/assets/43/37/8d/5e/5e8d3743202d9eba64d3af60/images/44/a1/da/63/63daa14403648fd590001f8f/8116_Front.jpg',
    available: true,
    type: 'pesticide',
    category: 'fungicide'
  },
  {
    id: 'p5',
    name: 'Herbicide Solution',
    description: 'Controls weeds in crop fields without affecting the main crop. Selective action.',
    price: 420,
    image: 'https://image.made-in-china.com/202f0j00MVWkyhHlEQcs/High-Quality-Herbicide-Glyphosate-480-SL-360g-L-540g-L-SL.jpg',
    available: true,
    type: 'pesticide',
    category: 'herbicide'
  },
  {
    id: 'p6',
    name: 'Snail & Slug Pellets',
    description: 'Controls snails and slugs in vegetable gardens and crop fields. Rain-resistant formula.',
    price: 300,
    image: 'https://sherwoodpst.com/wp-content/uploads/snail.jpg',
    available: true,
    type: 'pesticide',
    category: 'molluscicide'
  },
  {
    id: 'p7',
    name: 'Chlorpyrifos',
    description: 'Broad-spectrum insecticide effective against various crop pests. Professional grade formulation.',
    price: 480,
    image: 'https://www.vsdindustries.com/assets/img/blog/seo-img03.jpg',
    available: true,
    type: 'pesticide',
    category: 'chemical'
  },
  {
    id: 'p8',
    name: 'Carbendazim',
    description: 'Systemic fungicide for controlling various plant diseases. Provides long-lasting protection.',
    price: 520,
    image: 'https://www.pomais.com/wp-content/uploads/2024/08/Carbendazim-50wp-1.jpg',
    available: true,
    type: 'pesticide',
    category: 'chemical'
  },
  {
    id: 'p9',
    name: 'Sulfur Fungicide',
    description: 'Natural sulfur-based fungicide effective against powdery mildew and other fungal problems.',
    price: 360,
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/12/CT/LV/ZA/62270427/sulfur-systemic-fungicide.jpg',
    available: true,
    type: 'pesticide',
    category: 'fungicide'
  },
  {
    id: 'p10',
    name: 'BioControl Bacteria',
    description: 'Beneficial bacteria that protect plants from pathogens and enhance growth. Eco-friendly solution.',
    price: 470,
    image: 'https://www.futurecobioscience.com/wp-content/uploads/2021/09/24-Nofly-2.jpg',
    available: true,
    type: 'pesticide',
    category: 'biological'
  },
  {
    id: 'p11',
    name: 'Pre-emergent Herbicide',
    description: 'Prevents weed germination when applied before weeds emerge. Season-long control.',
    price: 410,
    image: 'https://tiimg.tistatic.com/fp/1/003/269/pendimethalin-herbicide-783.jpg',
    available: true,
    type: 'pesticide',
    category: 'herbicide'
  },
  {
    id: 'p12',
    name: 'Advanced Slug Control',
    description: 'Next-generation molluscicide with improved rain resistance and eco-friendly formulation.',
    price: 320,
    image: 'https://agnova.com.au/image_cache/content/custom/products/packshots/proportion/Ironmax-Pro_w360_h573/Ironmax-Pro_09150131.jpg',
    available: true,
    type: 'pesticide',
    category: 'molluscicide'
  }
];

const Pesticides = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'organic', name: 'Organic' },
    { id: 'chemical', name: 'Chemical' },
    { id: 'fungicide', name: 'Fungicide' },
    { id: 'biological', name: 'Biological' },
    { id: 'herbicide', name: 'Herbicide' },
    { id: 'molluscicide', name: 'Molluscicide' }
  ];
  
  const filteredPesticides = activeCategory === 'all' 
    ? pesticidesData 
    : pesticidesData.filter(pesticide => pesticide.category === activeCategory);

  return (
    <MainLayout>
      {/* Header Section with highlighted green heading and subheading */}
      <section className="py-12 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FEF7CD]/40 rounded-lg shadow-md p-8 mb-10">
            <h1 className="text-4xl font-bold mb-4 text-fern">
              Agricultural Pesticides
            </h1>
            <p className="max-w-3xl text-lg text-gray-600">
              Explore our range of effective pesticides designed to protect your crops from pests, diseases, and weeds, ensuring optimal yield and quality.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-fern text-white' 
                    : 'bg-white text-gray-700 hover:bg-vista-blue/20 border border-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPesticides.map((pesticide) => (
              <ProductCard 
                key={pesticide.id} 
                product={pesticide}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Safe Pesticide Usage Section with light gold background */}
      <section className="py-16 bg-[#f5d67a]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-fern">
              Safe Pesticide Usage
            </h2>
            <p className="text-xl mb-8 text-farm-900 max-w-3xl mx-auto">
              Learn best practices for safe and effective pesticide application to protect your crops while ensuring environmental sustainability.
            </p>
            
            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-fern mb-3">Read Instructions</h3>
                <p className="text-gray-700">Always carefully read and follow the manufacturer's instructions on the label before application.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-fern mb-3">Protective Gear</h3>
                <p className="text-gray-700">Use appropriate protective equipment including gloves, mask, and eye protection when handling pesticides.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-fern mb-3">Proper Storage</h3>
                <p className="text-gray-700">Store pesticides in their original containers, away from food, children, and pets in a cool, dry place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Pesticides;
