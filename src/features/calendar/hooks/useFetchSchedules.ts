import { useEffect, useState } from 'react';
import { getSchedules } from '@/features/calendar/hooks/api';
import type { CalendarEvent } from '@/features/calendar/types/scheduleTypes';
import { mapScheduleToEvent } from '@/features/calendar/utils/mapSchedule';

export function useFetchSchedules() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const schedules = await getSchedules();
      setEvents(schedules.map(mapScheduleToEvent));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tải lịch làm việc';
      setError(errorMessage);
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSchedules();
  }, []);

  return {
    events,
    loading,
    error,
    refetch: fetchSchedules,
  };
}
