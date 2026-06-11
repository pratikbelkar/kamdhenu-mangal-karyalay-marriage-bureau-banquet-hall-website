import { useGetTimeSlots, useSetTimeSlots } from '../hooks/useQueries';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import type { TimeSlot } from '../backend';

export default function TimeSlotManager() {
  const { data: timeSlots = [] } = useGetTimeSlots();
  const setTimeSlots = useSetTimeSlots();
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
  });

  const handleAddSlot = () => {
    if (!newSlot.date || !newSlot.time) {
      toast.error('Please select both date and time');
      return;
    }

    const dateTime = new Date(`${newSlot.date}T${newSlot.time}`);
    const startTime = BigInt(dateTime.getTime());
    const endTime = BigInt(dateTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const slot: TimeSlot = {
      id: `slot-${Date.now()}`,
      startTime,
      endTime,
      isAvailable: true,
    };

    const updatedSlots = [...timeSlots, slot];
    
    setTimeSlots.mutate(updatedSlots, {
      onSuccess: () => {
        toast.success('Time slot added successfully');
        setNewSlot({ date: '', time: '' });
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to add time slot');
      },
    });
  };

  const handleRemoveSlot = (id: string) => {
    const updatedSlots = timeSlots.filter(slot => slot.id !== id);
    
    setTimeSlots.mutate(updatedSlots, {
      onSuccess: () => {
        toast.success('Time slot removed successfully');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to remove time slot');
      },
    });
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Slot Management</CardTitle>
        <CardDescription>Add and manage available booking time slots</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Slot */}
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Time Slot
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newSlot.date}
                onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newSlot.time}
                onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddSlot} disabled={setTimeSlots.isPending} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Slot
              </Button>
            </div>
          </div>
        </div>

        {/* Existing Slots */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Existing Time Slots
          </h3>
          {timeSlots.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No time slots configured yet</p>
          ) : (
            <div className="space-y-2">
              {timeSlots.map(slot => (
                <div
                  key={slot.id}
                  className="flex justify-between items-center border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{formatDate(slot.startTime)}</p>
                    <p className="text-sm text-muted-foreground">
                      {slot.isAvailable ? 'Available' : 'Booked'}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveSlot(slot.id)}
                    disabled={setTimeSlots.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
