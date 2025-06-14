
import ProductCard from './ProductCard';
import { Product } from './ProductCard';

interface ProductCardWrapperProps {
  product: Product;
  showAddToCart?: boolean;
  showBooking?: boolean;
  onBook?: (product: Product) => void;
}

const ProductCardWrapper = ({ product, showAddToCart, showBooking, onBook }: ProductCardWrapperProps) => {
  return (
    <ProductCard 
      product={product} 
      showAddToCart={showAddToCart} 
      showBooking={showBooking}
      onBook={onBook}
    />
  );
};

export default ProductCardWrapper;
