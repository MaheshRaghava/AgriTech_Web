import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, PackageCheck, ShoppingCart, ClipboardList } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCart, Order } from '@/contexts/CartContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { firestore } from '@/firebase';
import { collection, onSnapshot, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

// Booking type for admin view
interface Booking {
  id: string;
  equipmentName: string;
  dates: string[];
  notes?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address?: string;
  pincode?: string;
  createdAt: string;
  docId?: string;
  image?: string;
  rentalPrice?: number;
  rentalPeriod?: string;
}

// Helper: converts Firestore snapshot to Booking type
function bookingFromSnapshot(docSnap: QueryDocumentSnapshot<DocumentData>): Booking {
  return { ...(docSnap.data() as Booking), docId: docSnap.id };
}

// Helper: safely format a date string or return '-' if invalid
function formatIfValid(dateString: string | undefined | null, dateFormat: string) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? "-" : format(d, dateFormat);
}

// Helper: safely format a booking date range
function formatBookingDates(dates: string[]) {
  if (!dates || dates.length === 0) return '-';
  if (dates.length === 1) {
    return formatIfValid(dates[0], 'MMM d, yyyy');
  }
  const sorted = [...dates].sort();
  return `${formatIfValid(sorted[0], 'MMM d, yyyy')} - ${formatIfValid(sorted[sorted.length - 1], 'MMM d, yyyy')}`;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuth();
  const { orders, updateOrderStatus } = useCart();
  const { toast } = useToast();

  // State for all bookings (admin)
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load all bookings for admin on mount
  useEffect(() => {
    if (!isAuthenticated || userType !== 'admin') {
      // Redirect to admin login if not authenticated or not admin
      navigate('/admin-login');
    }
    // Subscribe to bookings collection in Firestore
    const unsub = onSnapshot(collection(firestore, "bookings"), (snapshot) => {
      setBookings(snapshot.docs.map(bookingFromSnapshot));
    });
    return () => unsub();
  }, [isAuthenticated, userType, navigate]);

  // Order status actions (approve, complete, cancel)
  const handleApproveOrder = async (orderDocId: string) => {
    await updateOrderStatus(orderDocId, 'processing');
    toast({
      title: "Order Approved",
      description: `Order has been approved and is now being processed.`,
    });
  };
  const handleCompleteOrder = async (orderDocId: string) => {
    await updateOrderStatus(orderDocId, 'completed');
    toast({
      title: "Order Completed",
      description: `Order has been marked as completed.`,
    });
  };
  const handleCancelOrder = async (orderDocId: string) => {
    await updateOrderStatus(orderDocId, 'cancelled');
    toast({
      title: "Order Cancelled",
      description: `Order has been cancelled.`,
    });
  };

  // Order filtering for admin tabs
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const processingOrders = orders.filter(order => order.status === 'processing');
  const completedOrders = orders.filter(order => order.status === 'completed');
  const cancelledOrders = orders.filter(order => order.status === 'cancelled');

  // Bookings filtering for admin tabs
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const processingBookings = bookings.filter(b => b.status === 'processing');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  // Helpers for order fields
  const getOrderTotal = (order: Order): number => order.totalPrice || order.total;
  const getOrderDate = (order: Order): string => order.orderDate || order.date;
  const getCustomerName = (order: Order): string => order.customerName || 'Anonymous Customer';

  return (
    <MainLayout>
      <section className="py-12 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard summary cards */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold mb-4 text-farm-600">Admin Dashboard</h1>
            <p className="text-gray-600 mb-6">Manage orders, bookings, products, and customer information</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-600">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <ShoppingCart className="h-8 w-8 text-farm-500 mr-3" />
                    <span className="text-3xl font-bold">{orders.length}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-600">Total Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <ClipboardList className="h-8 w-8 text-violet-500 mr-3" />
                    <span className="text-3xl font-bold">{bookings.length}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-600">Pending Approval (Orders)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <PackageCheck className="h-8 w-8 text-amber-500 mr-3" />
                    <span className="text-3xl font-bold">{pendingOrders.length}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-600">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold">₹{orders.reduce((sum, order) => sum + getOrderTotal(order), 0).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Orders Management Tabs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6 text-farm-600">Order Management</h2>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="pending" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
                  Pending ({pendingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="processing" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                  Processing ({processingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900">
                  Completed ({completedOrders.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-900">
                  Cancelled ({cancelledOrders.length})
                </TabsTrigger>
              </TabsList>
              {/* Pending Orders */}
              <TabsContent value="pending" className="mt-0">
                {pendingOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Items</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pendingOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                            {/* Defensive date formatting for order date */}
                            <td className="px-4 py-4 text-sm text-gray-600">{formatIfValid(getOrderDate(order), 'MMM d, yyyy, HH:mm')}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{getCustomerName(order)}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{order.items.length} items</td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">₹{getOrderTotal(order).toLocaleString()}</td>
                            <td className="px-4 py-4">
                              <Badge className="bg-amber-100 text-amber-800 border border-amber-200">
                                Pending
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-right space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveOrder(order.docId!)}
                                className="bg-fern hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleCancelOrder(order.docId!)}
                              >
                                <X className="h-4 w-4 mr-1" /> Cancel
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No pending orders</div>
                )}
              </TabsContent>
              {/* Processing Orders */}
              <TabsContent value="processing" className="mt-0">
                {processingOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Items</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {processingOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                            {/* Defensive date formatting for order date */}
                            <td className="px-4 py-4 text-sm text-gray-600">{formatIfValid(getOrderDate(order), 'MMM d, yyyy, HH:mm')}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{getCustomerName(order)}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{order.items.length} items</td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">₹{getOrderTotal(order).toLocaleString()}</td>
                            <td className="px-4 py-4">
                              <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
                                Processing
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <Button
                                size="sm"
                                onClick={() => handleCompleteOrder(order.docId!)}
                                className="bg-fern hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" /> Complete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No orders in processing</div>
                )}
              </TabsContent>
              {/* Completed Orders */}
              <TabsContent value="completed" className="mt-0">
                {completedOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Items</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {completedOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                            {/* Defensive date formatting for order date */}
                            <td className="px-4 py-4 text-sm text-gray-600">{formatIfValid(getOrderDate(order), 'MMM d, yyyy, HH:mm')}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{getCustomerName(order)}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{order.items.length} items</td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">₹{getOrderTotal(order).toLocaleString()}</td>
                            <td className="px-4 py-4">
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                Completed
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No completed orders</div>
                )}
              </TabsContent>
              {/* Cancelled Orders */}
              <TabsContent value="cancelled" className="mt-0">
                {cancelledOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Items</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cancelledOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                            {/* Defensive date formatting for order date */}
                            <td className="px-4 py-4 text-sm text-gray-600">{formatIfValid(getOrderDate(order), 'MMM d, yyyy, HH:mm')}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{getCustomerName(order)}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{order.items.length} items</td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">₹{getOrderTotal(order).toLocaleString()}</td>
                            <td className="px-4 py-4">
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                Cancelled
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No cancelled orders</div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Bookings Management Tabs */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-bold mb-6 text-farm-600">Equipment Bookings Management</h2>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="pending" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
                  Pending ({pendingBookings.length})
                </TabsTrigger>
                <TabsTrigger value="processing" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                  Processing ({processingBookings.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900">
                  Completed ({completedBookings.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-900">
                  Cancelled ({cancelledBookings.length})
                </TabsTrigger>
              </TabsList>
              {/* Pending Bookings */}
              <TabsContent value="pending" className="mt-0">
                {pendingBookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booking ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Equipment</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booked Dates</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pendingBookings.map((booking) => (
                          <tr key={booking.docId}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{booking.docId}</td>
                            {/* Defensive date formatting for booking createdAt */}
                            <td className="px-4 py-4 text-sm text-gray-600">{formatIfValid(booking.createdAt, 'MMM d, yyyy')}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.customerName} <br/> <span className="text-xs">{booking.customerEmail}</span></td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.equipmentName}</td>
                            {/* Defensive date formatting for booking date range */}
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.dates && booking.dates.length > 0 ? formatBookingDates(booking.dates) : '-'}</td>
                            <td className="px-4 py-4">
                              <Badge className="bg-amber-100 text-amber-800 border border-amber-200">
                                Pending
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No pending bookings</div>
                )}
              </TabsContent>
              {/* Processing Bookings */}
              <TabsContent value="processing" className="mt-0">
                {processingBookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booking ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Equipment</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booked Dates</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {processingBookings.map((booking) => (
                          <tr key={booking.docId}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{booking.docId}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{formatIfValid(booking.createdAt, 'MMM d, yyyy')}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.customerName} <br/> <span className="text-xs">{booking.customerEmail}</span></td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.equipmentName}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.dates && booking.dates.length > 0 ? formatBookingDates(booking.dates) : '-'}</td>
                            <td className="px-4 py-4">
                              <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
                                Processing
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No processing bookings</div>
                )}
              </TabsContent>
              {/* Completed Bookings */}
              <TabsContent value="completed" className="mt-0">
                {completedBookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booking ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Equipment</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booked Dates</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {completedBookings.map((booking) => (
                          <tr key={booking.docId}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{booking.docId}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{formatIfValid(booking.createdAt, 'MMM d, yyyy')}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.customerName} <br/> <span className="text-xs">{booking.customerEmail}</span></td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.equipmentName}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.dates && booking.dates.length > 0 ? formatBookingDates(booking.dates) : '-'}</td>
                            <td className="px-4 py-4">
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                Completed
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No completed bookings</div>
                )}
              </TabsContent>
              {/* Cancelled Bookings */}
              <TabsContent value="cancelled" className="mt-0">
                {cancelledBookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booking ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Equipment</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booked Dates</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cancelledBookings.map((booking) => (
                          <tr key={booking.docId}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{booking.docId}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{formatIfValid(booking.createdAt, 'MMM d, yyyy')}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.customerName} <br/> <span className="text-xs">{booking.customerEmail}</span></td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.equipmentName}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{booking.dates && booking.dates.length > 0 ? formatBookingDates(booking.dates) : '-'}</td>
                            <td className="px-4 py-4">
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                Cancelled
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No cancelled bookings</div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminDashboard;