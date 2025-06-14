
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Info, Calendar, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  available: boolean;
  type: 'equipment' | 'seed' | 'pesticide' | 'tool';
  featured?: boolean;
  rentalPeriod?: string;
  rentalPrice?: number;
}

interface ProductCardProps {
  product: Product;
  onBook?: (product: Product) => void;
  showAddToCart?: boolean;
  showBooking?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBook, showAddToCart = true, showBooking }) => {
  const { addItemToCart } = useCart();
  const { translate } = useLanguage();
  
  const handleAddToCart = () => {
    addItemToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  
  const isEquipment = product.type === 'equipment';
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://img.freepik.com/free-photo/agricultural-industry-drone-spraying-fertilizer-field_23-2149454883.jpg?w=996&t=st=1747371746~exp=1747372346~hmac=87f4f3757044708d4487292a734aeea19355cf59f647c19722cd1a603141f485";
          }}
        />
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-fern text-white">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-bold mb-2 text-fern">{product.name}</h3>
        <p className="text-gray-600 mb-4 text-sm flex-grow">{product.description.substring(0, 100)}...</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">
              {isEquipment 
                ? `₹${(product.rentalPrice || 0).toLocaleString()} ${product.rentalPeriod || 'per day'}`
                : `₹${product.price.toLocaleString()}`
              }
            </span>
            <Badge className={product.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {product.available ? translate('products.available') : translate('products.unavailable')}
            </Badge>
          </div>
          
          <div className="flex space-x-2">
            {isEquipment && onBook && showBooking && (
              <Button 
                onClick={() => onBook(product)} 
                className="w-full bg-fern hover:bg-farm-600 text-white"
                disabled={!product.available}
              >
                <Calendar className="mr-1 h-4 w-4" /> {translate('products.book')}
              </Button>
            )}
            
            {showAddToCart && !isEquipment && (
              <Button 
                onClick={handleAddToCart} 
                className="w-full bg-fern hover:bg-farm-600 text-white"
                disabled={!product.available}
              >
                <ShoppingCart className="mr-1 h-4 w-4" /> {translate('products.addToCart')}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
