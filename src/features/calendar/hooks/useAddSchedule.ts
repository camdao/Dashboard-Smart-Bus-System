import { useState } from 'react';
import type { CalendarEvent, ScheduleRequest } from '@/features/calendar/types/scheduleTypes';
import { mapScheduleToEvent } from '@/features/calendar/utils/mapSchedule';

import useCreateSchedule from './api/useCreateSchedule';

export function useAddSchedule() {
  const [error, setError] = useState<string | null>(null);

  const { mutate: createSchedule, isPending: loading } = useCreateSchedule({
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tạo lịch làm việc';
      setError(errorMessage);
      console.error('Error creating schedule:', err);
    },
    onSuccess: () => {
      setError(null);
    },
  });

  const addSchedule = (scheduleData: ScheduleRequest): Promise<CalendarEvent> => {
    return new Promise((resolve, reject) => {
      createSchedule(scheduleData, {
        onSuccess: (newSchedule) => {
          try {
            const newEvent = mapScheduleToEvent(newSchedule);
            resolve(newEvent);
          } catch (err) {
            reject(err);
          }
        },
        onError: (err) => {
          reject(err);
        },
      });
    });
  };

  return {
    addSchedule,
    loading,
    error,
  };
}