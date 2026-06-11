import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateBooking, useGetBookingsByEmail, useGetCallerUserProfile, useGetTimeSlots } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '../i18n';

export default function Booking() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: timeSlots } = useGetTimeSlots();
  const { data: userBookings } = useGetBookingsByEmail(userProfile?.email || '');
  const createBooking = useCreateBooking();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    serviceType: '',
    scheduledDate: '',
    message: '',
  });

  const isAuthenticated = !!identity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error(t('booking.loginRequired'));
      return;
    }

    try {
      const dateTimestamp = new Date(formData.scheduledDate).getTime();
      await createBooking.mutateAsync({
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        scheduledDate: BigInt(dateTimestamp),
      });

      toast.success(t('common.success'));
      setFormData({
        clientName: '',
        email: '',
        phone: '',
        serviceType: '',
        scheduledDate: '',
        message: '',
      });
    } catch (error: any) {
      toast.error(error.message || t('common.error'));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t('booking.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('booking.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Booking Form */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {t('booking.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isAuthenticated ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">{t('booking.loginRequired')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="clientName">{t('booking.form.name')}</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleChange('clientName', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t('booking.form.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t('booking.form.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="serviceType">{t('booking.form.service')}</Label>
                  <Select value={formData.serviceType} onValueChange={(value) => handleChange('serviceType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('booking.form.service')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">{t('booking.services.wedding')}</SelectItem>
                      <SelectItem value="engagement">{t('booking.services.engagement')}</SelectItem>
                      <SelectItem value="birthday">{t('booking.services.birthday')}</SelectItem>
                      <SelectItem value="anniversary">{t('booking.services.anniversary')}</SelectItem>
                      <SelectItem value="corporate">{t('booking.services.corporate')}</SelectItem>
                      <SelectItem value="other">{t('booking.services.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="scheduledDate">{t('booking.form.date')}</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleChange('scheduledDate', e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t('booking.form.message')}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={createBooking.isPending}>
                  {createBooking.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('booking.form.submitting')}
                    </>
                  ) : (
                    t('booking.form.submit')
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* My Bookings */}
        {isAuthenticated && userBookings && (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle>{t('booking.myBookings')}</CardTitle>
            </CardHeader>
            <CardContent>
              {userBookings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">{t('booking.noBookings')}</p>
              ) : (
                <div className="space-y-4">
                  {userBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{booking.serviceType}</h3>
                        <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(Number(booking.scheduledDate)).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">{booking.clientName}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

