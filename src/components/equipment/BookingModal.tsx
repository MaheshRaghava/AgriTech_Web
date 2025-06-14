import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from '@/components/product/ProductCard';
import { addDays } from 'date-fns';

// Firestore and Auth imports
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/firebase";
import { useAuth } from "@/contexts/AuthContext";

// Props type for BookingModal
interface BookingModalProps {
  equipment: Product;
  isOpen: boolean;
  onClose: () => void;
}

// BookingModal component
const BookingModal = ({ equipment, isOpen, onClose }: BookingModalProps) => {
  // State for form fields
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [notes, setNotes] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useAuth();

  // Form validation logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.name = "Name is required";
    if (!customerEmail.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(customerEmail)) newErrors.email = "Please enter a valid email";
    if (!customerPhone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(customerPhone.replace(/[^0-9]/g, ''))) newErrors.phone = "Please enter a valid 10-digit phone number";
    if (!date) newErrors.date = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (date && endDate && date > endDate) newErrors.endDate = "End date must be after start date";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!/^\d{6}$/.test(pincode.replace(/[^0-9]/g, ''))) newErrors.pincode = "Please enter a valid 6-digit pincode";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission handler: writes new booking to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build array of booking dates from start to end date
    const bookingDates: Date[] = [];
    if (date && endDate) {
      let currentDate = new Date(date);
      const lastDate = new Date(endDate);
      while (currentDate <= lastDate) {
        bookingDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    // Write booking to Firestore "bookings" collection
    try {
      await addDoc(collection(firestore, "bookings"), {
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        image: equipment.image,
        userId: user?.id,
        customerName,
        customerEmail, // This is used for filtering in MyBookings!
        customerPhone,
        address,
        pincode,
        dates: bookingDates.map(d => d.toISOString()),
        notes,
        status: "pending",
        createdAt: serverTimestamp(),
        rentalPrice: equipment.price,
        rentalPeriod: equipment.rentalPeriod,
      });
      alert("Booking successful! You can view it in My Bookings.");
      onClose();
      // Optionally: reset form fields here
    } catch (e) {
      alert("Booking failed! Please try again.");
      console.error(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Book {equipment.name}</DialogTitle>
          {/* Accessibility: Add a dialog description */}
          <DialogDescription>
            Please fill out the form below to complete your equipment booking.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Name and Email fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Full Name *</Label>
              <Input 
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Doe"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="customerEmail">Email Address *</Label>
              <Input 
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="john@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>
          
          {/* Phone and Pincode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerPhone">Phone Number *</Label>
              <Input 
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="1234567890"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input 
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="123456"
                className={errors.pincode ? "border-red-500" : ""}
                maxLength={6}
              />
              {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Full Address *</Label>
            <Textarea 
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your complete delivery address"
              className={errors.address ? "border-red-500" : ""}
              rows={3}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>
          
          {/* Start and End Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Booking Start Date *</Label>
              <div className={`border rounded-md p-2 ${errors.date ? "border-red-500" : ""}`}>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>
            <div>
              <Label>Booking End Date *</Label>
              <div className={`border rounded-md p-2 ${errors.endDate ? "border-red-500" : ""}`}>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => date < (new Date() || date < date)}
                  className="rounded-md border"
                />
              </div>
              {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific requirements or questions?"
              rows={3}
            />
          </div>
          
          {/* Equipment Details */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Equipment:</span>
              <span>{equipment.name}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Daily Rate:</span>
              <span>₹{equipment.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span>Total (per day):</span>
              <span>₹{equipment.price.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Final amount will be calculated based on the total rental duration</p>
          </div>
          
          {/* Buttons */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Confirm Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;