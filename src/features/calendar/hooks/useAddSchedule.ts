import { useState } from 'react';
import type { CalendarEvent, ScheduleRequest } from '@/features/calendar/types/scheduleTypes';
import { mapScheduleToEvent } from '@/features/calendar/utils/mapSchedule';

import useCreateSchedule from './mutation/useCreateSchedule';

export function useAddSchedule() {
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: createSchedule, isPending: loading } = useCreateSchedule({
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tạo lịch làm việc';
      setError(errorMessage);
      console.error('Error creating schedule:', err);
    },
    onSuccess: () => {
      setError(null);
    },
  });

  const addSchedule = async (scheduleData: ScheduleRequest): Promise<CalendarEvent> => {
    const createdSchedule = await createSchedule(scheduleData);
    return mapScheduleToEvent(createdSchedule);
  };

  return {
    addSchedule,
    loading,
    error,
  };
}
