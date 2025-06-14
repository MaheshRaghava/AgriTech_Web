import { useEffect, useState } from 'react';
import { format, addDays } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useCart, Order } from '@/contexts/CartContext';
import { Loader2, Package, CalendarCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const { isAuthenticated, userType, user } = useAuth();
  const { orders, reloadOrders } = useCart();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Filter orders belonging to current user
  const userEmail = user?.email || localStorage.getItem('userEmail');
  const myOrders = orders.filter(order =>
    order.customerEmail === userEmail
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Optionally reload orders (not needed if using Firestore onSnapshot)
    // reloadOrders();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  // Helper function to calculate estimated delivery date (3-7 days from order date)
  const getDeliveryEstimate = (orderDate: string) => {
    const date = new Date(orderDate);
    const minDelivery = addDays(date, 3);
    const maxDelivery = addDays(date, 7);
    return `${format(minDelivery, 'MMM d')} - ${format(maxDelivery, 'MMM d, yyyy')}`;
  };

  // Helper function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <MainLayout>
      <section className="py-12 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FEF7CD]/40 rounded-lg shadow-md p-8 mb-6">
            <h1 className="text-3xl font-bold mb-2 text-fern">My Orders</h1>
            <p className="text-gray-600">
              Track and manage your orders and equipment bookings
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-fern" />
              <span className="ml-2 text-gray-600">Loading your orders...</span>
            </div>
          ) : myOrders.length > 0 ? (
            <div className="space-y-6">
              {myOrders.map((order) => (
                <Card key={order.id} className="border-0 shadow-md">
                  <CardHeader className="bg-vista-blue/10 border-b border-vista-blue/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <CardTitle className="text-lg text-farm-800">{order.id}</CardTitle>
                      </div>
                      <div>
                        <Badge className={getStatusBadgeColor(order.status)}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">{format(new Date(order.orderDate || order.date), 'MMM d, yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-medium">₹{(order.totalPrice || order.total).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <CalendarCheck className="h-4 w-4 mr-1 text-farm-500" />
                          Estimated Delivery
                        </p>
                        <p className="font-medium">{getDeliveryEstimate(order.orderDate || order.date)}</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <h4 className="font-semibold text-farm-700">Items</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-farm-50 rounded-md flex items-center justify-center">
                            <Package className="h-6 w-6 text-farm-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                            <p className="text-xs text-gray-500">(₹{item.price} each)</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow border border-gray-100 p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
              <p className="text-gray-500 mb-4">
                You haven't placed any orders yet. Browse our products and start shopping!
              </p>
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                  <a href="/equipment" className="px-4 py-2 bg-farm-100 text-farm-700 rounded-md hover:bg-farm-200 transition-colors text-center">
                    Equipment
                  </a>
                  <a href="/seeds" className="px-4 py-2 bg-farm-100 text-farm-700 rounded-md hover:bg-farm-200 transition-colors text-center">
                    Seeds
                  </a>
                  <a href="/pesticides" className="px-4 py-2 bg-farm-100 text-farm-700 rounded-md hover:bg-farm-200 transition-colors text-center">
                    Pesticides
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default MyOrders;