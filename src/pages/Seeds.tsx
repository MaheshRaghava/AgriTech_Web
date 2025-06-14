
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ProductCard, { Product } from '@/components/product/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample seeds data
const seedsData: Product[] = [
  {
    id: 's001',
    name: 'High-Yield Wheat Seeds',
    description: 'Disease-resistant wheat variety with up to 20% higher yield than traditional varieties.',
    price: 1500,
    image: 'https://tiimg.tistatic.com/fp/1/008/139/hd-2851-high-yield-wheat-seed-with-40-kg-packaging-size-1-year-shelf-life-490.jpg',
    category: 'Cereals',
    available: true,
    featured: true,
    type: 'seed'
  },
  {
    id: 's002',
    name: 'Organic Rice Seeds',
    description: 'Certified organic rice seeds that require less water and grow faster than conventional varieties.',
    price: 2000,
    image: 'https://shecraftsin.com/cdn/shop/files/4_8887e2b4-7b5d-4ad6-9119-1183fc6b0ef4.png?v=1687796700',
    category: 'Cereals',
    available: true,
    featured: true,
    type: 'seed'
  },
  {
    id: 's003',
    name: 'High-Yield Cotton Seeds',
    description: 'Genetically optimized cotton seeds for maximum yield and pest resistance.',
    price: 3500,
    image: 'https://yashodaseeds.com/blog/wp-content/uploads/2025/03/Unlocking-High-Yield-Potential-with-the-Right-Cotton-Seed-Varieties.jpg',
    category: 'Fibers',
    available: true,
    featured: false,
    type: 'seed'
  },
  {
    id: 's004',
    name: 'Hybrid Tomato Seeds',
    description: 'High-yielding tomato seeds with excellent disease resistance and superior fruit quality.',
    price: 850,
    image: 'https://organicbazar.net/cdn/shop/products/Untitled-design-2022-06-13T162951.003.jpg?v=1694167526',
    category: 'Vegetables',
    available: true,
    featured: true,
    type: 'seed'
  },
  {
    id: 's005',
    name: 'Premium Maize Seeds',
    description: 'Drought-resistant maize seeds with high nutritional content.',
    price: 1200,
    image: 'https://admin.yashodaseeds.com/support/public/upload/Product/1708410905.jpg',
    category: 'Cereals',
    available: true,
    featured: false,
    type: 'seed'
  },
  {
    id: 's006',
    name: 'Organic Vegetable Seed Kit',
    description: 'A collection of certified organic vegetable seeds for home gardening.',
    price: 3000,
    image: 'https://images-cdn.ubuy.co.in/658fbf1683bb480a6e241747-organic-beginner-s-vegetable-garden.jpg',
    category: 'Vegetables',
    available: true,
    featured: true,
    type: 'seed'
  },
  {
    id: 's007',
    name: 'Jute Seeds',
    description: 'High-quality jute seeds for fiber production with excellent germination rate.',
    price: 1800,
    image: 'https://bangladeshtextilejournal.com/wp-content/uploads/2023/03/Bangladesh-to-import-5200-tonnes-of-jute-seeds-from-India-1-1200x720.jpg',
    category: 'Fibers',
    available: true,
    featured: false,
    type: 'seed'
  },
  {
    id: 's008',
    name: 'Green Peas Seeds',
    description: 'Fast-growing green pea seeds with high yield and excellent taste.',
    price: 950,
    image: 'https://m.media-amazon.com/images/I/612O377T9FL.jpg',
    category: 'Pulses',
    available: true,
    featured: true,
    type: 'seed'
  },
  {
    id: 's009',
    name: 'Masoor Dal Seeds',
    description: 'Premium quality red lentil seeds with high protein content and disease resistance.',
    price: 1100,
    image: 'https://healthymiller.com/cdn/shop/files/malkamasoor.png?v=1693908186',
    category: 'Pulses',
    available: true,
    featured: false,
    type: 'seed'
  },
  {
    id: 's010',
    name: 'Groundnut Seeds',
    description: 'High-oil content groundnut seeds with improved disease resistance and drought tolerance.',
    price: 1350,
    image: 'https://m.media-amazon.com/images/I/61xqIC7Vd2L._AC_UF1000,1000_QL80_.jpg',
    category: 'Oilseeds',
    available: true,
    featured: true,
    type: 'seed'
  },
  {
    id: 's011',
    name: 'Sunflower Seeds',
    description: 'Large-headed sunflower seeds for premium oil production with high oleic content.',
    price: 1250,
    image: 'https://m.media-amazon.com/images/I/71FabTrrpwL.jpg',
    category: 'Oilseeds',
    available: true,
    featured: false,
    type: 'seed'
  }
];

const Seeds = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const { isAuthenticated, userType } = useAuth();
  const { translate } = useLanguage();

  const [seeds, setSeeds] = useState<Product[]>(seedsData);
  
  const [newSeed, setNewSeed] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    available: true,
    featured: false
  });

  // Seed categories
  const categories = [
    { id: 'all', name: 'All Seeds' },
    { id: 'Cereals', name: 'Cereals' },
    { id: 'Vegetables', name: 'Vegetables' },
    { id: 'Fibers', name: 'Fibers' },
    { id: 'Pulses', name: 'Pulses' },
    { id: 'Oilseeds', name: 'Oilseeds' }
  ];
  
  // Filter seeds by category
  const filteredSeeds = activeCategory === 'all' 
    ? seeds 
    : seeds.filter(seed => seed.category === activeCategory);

  // Handle adding new seed (admin only)
  const handleAddSeed = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSeedItem: Product = {
      id: `s${seeds.length + 10}`,
      name: newSeed.name,
      description: newSeed.description,
      price: parseFloat(newSeed.price),
      image: newSeed.image || 'https://crop-accelerator.com/wp-content/uploads/2022/08/agriculture.jpg',
      category: newSeed.category,
      available: newSeed.available,
      featured: newSeed.featured,
      type: 'seed'
    };
    
    // Update seeds data (in a real app, this would be an API call)
    setSeeds([...seeds, newSeedItem]);
    
    toast.success("New seed added successfully!", {
      description: `${newSeed.name} has been added to the seed catalog.`
    });
    
    // Reset form and close modal
    setNewSeed({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      available: true,
      featured: false
    });
    setIsAddItemModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewSeed({
        ...newSeed,
        [name]: checked
      });
    } else {
      setNewSeed({
        ...newSeed,
        [name]: value
      });
    }
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="py-12 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FEF7CD]/40 rounded-lg shadow-md p-8 mb-10">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-fern">Quality Seeds</h1>
                <p className="max-w-3xl text-lg text-gray-600">
                  Explore our selection of high-quality seeds for maximum yield and better crop health.
                </p>
              </div>
              
              {isAuthenticated && userType === 'admin' && (
                <Button 
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="bg-fern hover:bg-farm-600 text-white"
                >
                  Add New Seed
                </Button>
              )}
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Seeds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSeeds.map((seed) => (
              <ProductCard 
                key={seed.id} 
                product={seed}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Information Section with added image */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-fern">Why Our Seeds Stand Out</h2>
              <div className="space-y-6">
                <div className="bg-farm-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-fern">Higher Yield Potential</h3>
                  <p>Our seeds are scientifically developed to maximize yield in various climate conditions.</p>
                </div>
                <div className="bg-farm-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-fern">Disease Resistance</h3>
                  <p>Built-in resistance to common crop diseases means healthier plants and less reliance on chemicals.</p>
                </div>
                <div className="bg-farm-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-fern">Climate Adaptability</h3>
                  <p>Seeds that are adapted to perform well in the specific climate conditions of our region.</p>
                </div>
                <div className="bg-farm-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-fern">Quality Guaranteed</h3>
                  <p>All seeds undergo rigorous quality testing to ensure high germination rates and purity.</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://t3.ftcdn.net/jpg/07/50/13/82/360_F_750138297_kBTJ0wHJE1PFideUvnp96Jyfd9Tin4yx.jpg"
                alt="Quality Seeds" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                style={{minHeight: "500px"}}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Add New Seed Modal (Admin only) */}
      <Dialog open={isAddItemModalOpen} onOpenChange={setIsAddItemModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-fern">Add New Seed</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddSeed} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Seed Name</label>
                <Input
                  id="name"
                  name="name"
                  value={newSeed.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Hybrid Rice Seeds"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newSeed.category}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Cereals">Cereals</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fibers">Fibers</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Oilseeds">Oilseeds</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                name="description"
                value={newSeed.description}
                onChange={handleInputChange}
                required
                placeholder="Describe the seed variety and its benefits"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price (₹ per kg)</label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newSeed.price}
                  onChange={handleInputChange}
                  required
                  placeholder="1000"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">Image URL</label>
                <Input
                  id="image"
                  name="image"
                  value={newSeed.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={newSeed.available}
                  onChange={(e) => setNewSeed({...newSeed, available: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="available" className="text-sm font-medium">Available in Stock</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={newSeed.featured}
                  onChange={(e) => setNewSeed({...newSeed, featured: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Product</label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsAddItemModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-fern hover:bg-farm-600 text-white"
              >
                Add Seed
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Seeds;
