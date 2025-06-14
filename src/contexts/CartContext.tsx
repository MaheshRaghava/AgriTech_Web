import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '@/components/product/ProductCard';
import { firestore } from '@/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

// --- Types ---
export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface BookingDetails {
  dates: Date[];
  notes: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  userId: string; // always required
  totalPrice: number;
  orderDate: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  docId?: string; // Firestore document id
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  orders: Order[];
  addItemToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: (customerInfo: CustomerInfo) => Promise<void>;
  updateOrderStatus: (orderDocId: string, newStatus: Order['status']) => Promise<void>;
  reloadOrders: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  orders: [],
  addItemToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  checkout: async () => {},
  updateOrderStatus: async () => {},
  reloadOrders: async () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

function orderFromSnapshot(docSnap: QueryDocumentSnapshot<DocumentData>): Order {
  return { ...(docSnap.data() as Order), docId: docSnap.id };
}

function removeUndefined(obj: any) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const { userType, user } = useAuth();

  // --- Firestore orders loading ---
  const fetchOrders = async () => {
    let q;
    if (userType === 'admin') {
      q = collection(firestore, 'orders');
    } else if (user && user.email) {
      q = query(collection(firestore, 'orders'), where('customerEmail', '==', user.email));
    } else {
      setOrders([]);
      return;
    }
    const querySnapshot = await getDocs(q);
    const loadedOrders: Order[] = [];
    querySnapshot.forEach(docSnap => {
      loadedOrders.push(orderFromSnapshot(docSnap));
    });
    setOrders(loadedOrders);
  };

  useEffect(() => {
    // Set up real-time Firestore sync
    let unsubscribe: (() => void) | undefined;
    if (userType === 'admin') {
      const q = collection(firestore, 'orders');
      unsubscribe = onSnapshot(q, snapshot => {
        setOrders(snapshot.docs.map(orderFromSnapshot));
      });
    } else if (user && user.email) {
      const q = query(collection(firestore, 'orders'), where('customerEmail', '==', user.email));
      unsubscribe = onSnapshot(q, snapshot => {
        setOrders(snapshot.docs.map(orderFromSnapshot));
      });
    } else {
      setOrders([]);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userType, user?.email]);

  const reloadOrders = fetchOrders;

  // --- Cart logic ---
  const addItemToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // --- Updated checkout: always require CustomerInfo object and use all its fields ---
  const checkout = async (customerInfo: CustomerInfo) => {
    if (items.length === 0) return;

    const userId = user?.id;
    if (!userId) {
      alert("You must be logged in to place an order.");
      return;
    }

    const { name: customerName, email: customerEmail, phone: customerPhone } = customerInfo;

    const currentDate = new Date().toISOString();
    const currentTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder: Omit<Order, 'docId'> = {
      id: `order-${Date.now()}`,
      items: [...items],
      total: currentTotal,
      date: currentDate,
      status: 'pending',
      userId,
      totalPrice: currentTotal,
      orderDate: currentDate,
      customerName,
      customerEmail,
      customerPhone,
    };

    try {
      await addDoc(collection(firestore, 'orders'), removeUndefined({
        ...newOrder,
        createdAt: serverTimestamp(),
      }));
      clearCart();
      await fetchOrders();
    } catch (e) {
      console.error("Order creation failed:", e);
      alert("Order failed! Please try again.");
    }
  };

  // Admin: update order status in Firestore
  const updateOrderStatus = async (orderDocId: string, newStatus: Order['status']) => {
    const orderRef = doc(firestore, 'orders', orderDocId);
    await updateDoc(orderRef, { status: newStatus });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        orders,
        addItemToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        updateOrderStatus,
        reloadOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};