import { useState } from 'react';
import { createSchedule } from '@/features/calendar/hooks/api';
import type { CalendarEvent, ScheduleRequest } from '@/features/calendar/types/scheduleTypes';
import { mapScheduleToEvent } from '@/features/calendar/utils/mapSchedule';

/**
 * Hook chuyên dùng để tạo schedule mới
 * Trả về hàm addSchedule và loading/error state
 */
export function useAddSchedule() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSchedule = async (scheduleData: ScheduleRequest): Promise<CalendarEvent> => {
    setLoading(true);
    setError(null);
    try {
      const newSchedule = await createSchedule(scheduleData);
      const newEvent = mapScheduleToEvent(newSchedule);
      return newEvent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tạo lịch làm việc';
      setError(errorMessage);
      console.error('Error creating schedule:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addSchedule,
    loading,
    error,
  };
}
