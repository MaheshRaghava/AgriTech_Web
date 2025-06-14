import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { firestore } from '@/firebase';
import { Loader2, CalendarCheck, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  query,
  where,
  onSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

// Booking type definition for TypeScript and code clarity
interface Booking {
  id: string;
  equipmentName: string;
  dates: string[]; // ISO date strings
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

// Converts a Firestore snapshot to a Booking object
function bookingFromSnapshot(docSnap: QueryDocumentSnapshot<DocumentData>): Booking {
  return { ...(docSnap.data() as Booking), docId: docSnap.id };
}

// Helper function to safely format dates (avoids RangeError)
function formatIfValid(dateString: string | undefined | null, dateFormat: string) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? "-" : format(d, dateFormat);
}

const MyBookings = () => {
  const { isAuthenticated, user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load bookings for the authenticated user from Firestore
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login
      navigate('/login');
      return;
    }
    let unsub: (() => void) | undefined;
    if (user?.email) {
      // Query bookings with the logged-in user's email
      const q = query(
        collection(firestore, 'bookings'),
        where('customerEmail', '==', user.email)
      );
      unsub = onSnapshot(q, (snapshot) => {
        setBookings(snapshot.docs.map(bookingFromSnapshot));
        setLoading(false);
      });
    } else {
      setBookings([]);
      setLoading(false);
    }
    // Cleanup Firestore listener on unmount
    return () => {
      if (unsub) unsub();
    };
  }, [isAuthenticated, user?.email, navigate]);

  // Helper to format booking date range, uses defensive formatting
  const formatBookingDates = (dates: string[]) => {
    if (!dates || dates.length === 0) return '-';
    if (dates.length === 1) {
      return formatIfValid(dates[0], 'MMM d, yyyy');
    }
    const sorted = [...dates].sort();
    return `${formatIfValid(sorted[0], 'MMM d, yyyy')} - ${formatIfValid(sorted[sorted.length - 1], 'MMM d, yyyy')}`;
  };

  // Returns CSS classes for status badge color
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
          {/* Header */}
          <div className="bg-[#FEF7CD]/40 rounded-lg shadow-md p-8 mb-6">
            <h1 className="text-3xl font-bold mb-2 text-fern">My Equipment Bookings</h1>
            <p className="text-gray-600">
              View and manage your equipment rental bookings
            </p>
          </div>
          {/* Loading spinner */}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-fern" />
              <span className="ml-2 text-gray-600">Loading your bookings...</span>
            </div>
          ) : bookings.length > 0 ? (
            // Bookings list
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id || booking.docId} className="border-0 shadow-md">
                  {/* Booking header with ID and status */}
                  <CardHeader className="bg-vista-blue/10 border-b border-vista-blue/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Booking ID</p>
                        <CardTitle className="text-lg text-farm-800">{booking.id || booking.docId}</CardTitle>
                      </div>
                      <div>
                        <Badge className={getStatusBadgeColor(booking.status)}>
                          {booking.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  {/* Booking main content */}
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Equipment */}
                      <div>
                        <p className="text-sm text-gray-500">Equipment</p>
                        <p className="font-medium flex items-center">
                          {booking.image && (
                            <img
                              src={booking.image}
                              alt={booking.equipmentName}
                              className="h-8 w-8 rounded mr-2 border"
                              style={{ objectFit: "cover" }}
                            />
                          )}
                          {booking.equipmentName}
                        </p>
                      </div>
                      {/* Booked dates */}
                      <div>
                        <p className="text-sm text-gray-500">Booked Dates</p>
                        <p className="font-medium">{formatBookingDates(booking.dates)}</p>
                      </div>
                      {/* Booking placed date */}
                      <div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <CalendarCheck className="h-4 w-4 mr-1 text-farm-500" />
                          Booking Placed
                        </p>
                        <p className="font-medium">
                          {formatIfValid(booking.createdAt, 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    {/* Customer and booking details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-farm-700 mb-2">Customer Info</h4>
                        <div className="text-gray-700">
                          <div><strong>Name:</strong> {booking.customerName}</div>
                          <div><strong>Email:</strong> {booking.customerEmail}</div>
                          {booking.customerPhone && <div><strong>Phone:</strong> {booking.customerPhone}</div>}
                          {booking.address && <div><strong>Address:</strong> {booking.address}</div>}
                          {booking.pincode && <div><strong>Pincode:</strong> {booking.pincode}</div>}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-farm-700 mb-2">Booking Details</h4>
                        <div className="text-gray-700">
                          {booking.notes && <div><strong>Notes:</strong> {booking.notes}</div>}
                          {booking.rentalPrice && (
                            <div>
                              <strong>Rental Price:</strong> ₹{booking.rentalPrice} {booking.rentalPeriod || ''}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // No bookings UI
            <div className="bg-white rounded-lg shadow border border-gray-100 p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Bookings Yet</h3>
              <p className="text-gray-500 mb-4">
                You haven't booked any equipment yet. Browse our equipment and make your first booking!
              </p>
              <div className="flex justify-center">
                <a href="/equipment" className="px-4 py-2 bg-farm-100 text-farm-700 rounded-md hover:bg-farm-200 transition-colors text-center">
                  Book Equipment
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default MyBookings;