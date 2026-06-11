import { useIsCallerAdmin, useGetPhotos, useGetAllBookings, useGetAllPayments, useDeletePhoto, useDeleteBooking, useUpdateBookingStatus, useSetTimeSlots, useGetTimeSlots } from '../hooks/useQueries';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Image, Calendar, CreditCard, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import PhotoUpload from './PhotoUpload';
import TimeSlotManager from './TimeSlotManager';

export default function AdminPanel() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: photos = [] } = useGetPhotos();
  const { data: bookings = [] } = useGetAllBookings();
  const { data: payments = [] } = useGetAllPayments();
  const deletePhoto = useDeletePhoto();
  const deleteBooking = useDeleteBooking();
  const updateStatus = useUpdateBookingStatus();

  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  if (adminLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Access Denied
            </CardTitle>
            <CardDescription>
              You don't have permission to access the admin panel.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    
    try {
      await deletePhoto.mutateAsync(id);
      toast.success('Photo deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete photo');
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      await deleteBooking.mutateAsync(id);
      toast.success('Booking deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete booking');
    }
  };

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await updateStatus.mutateAsync({ bookingId, status });
      toast.success('Booking status updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          Admin Panel
        </h1>
        <p className="text-muted-foreground">Manage photos, bookings, and time slots</p>
      </div>

      <Tabs defaultValue="photos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="photos">
            <Image className="h-4 w-4 mr-2" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="h-4 w-4 mr-2" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="h-4 w-4 mr-2" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="timeslots">
            <Calendar className="h-4 w-4 mr-2" />
            Time Slots
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Photo Gallery Management</CardTitle>
                  <CardDescription>Upload and manage portfolio photos</CardDescription>
                </div>
                <Button onClick={() => setShowPhotoUpload(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {photos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No photos uploaded yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photos.map(photo => (
                    <div key={photo.id} className="border rounded-lg overflow-hidden">
                      <img
                        src={photo.fileReference.getDirectURL()}
                        alt={photo.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold">{photo.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{photo.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          {photo.categories.map(cat => (
                            <span key={cat} className="px-2 py-1 bg-muted rounded text-xs">
                              {cat}
                            </span>
                          ))}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePhoto(photo.id)}
                          disabled={deletePhoto.isPending}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
              <CardDescription>View and manage client bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No bookings yet</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{booking.clientName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.email}</p>
                          <p className="text-sm text-muted-foreground">{booking.phone}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Service:</span> {booking.serviceType}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date:</span> {formatDate(booking.scheduledDate)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                          disabled={updateStatus.isPending}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                          disabled={updateStatus.isPending}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteBooking(booking.id)}
                          disabled={deleteBooking.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View all payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No payments yet</p>
              ) : (
                <div className="space-y-4">
                  {payments.map(payment => (
                    <div key={payment.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">₹{Number(payment.amount)}</p>
                        <p className="text-sm text-muted-foreground">Booking: {payment.bookingId}</p>
                        <p className="text-sm text-muted-foreground">{payment.paymentMethod}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'success' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeslots" className="space-y-6">
          <TimeSlotManager />
        </TabsContent>
      </Tabs>

      {showPhotoUpload && <PhotoUpload onClose={() => setShowPhotoUpload(false)} />}
    </div>
  );
}
