import { useState } from 'react';
import type { ScheduleRequest } from '@/features/calendar/types/scheduleTypes';

import useUpdateSchedule from './api/updateSchedule';

export function useUpdateScheduleHook() {
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateScheduleMutation, isPending: loading } = useUpdateSchedule({
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : 'Không thể cập nhật lịch làm việc';
      setError(errorMessage);
      console.error('Error updating schedule:', err);
    },
    onSuccess: () => {
      setError(null);
    },
  });

  const updateSchedule = (id: number, scheduleData: ScheduleRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      updateScheduleMutation(
        { id, data: scheduleData },
        {
          onSuccess: () => {
            resolve();
          },
          onError: (err) => {
            reject(err);
          },
        },
      );
    });
  };

  return {
    updateSchedule,
    loading,
    error,
  };
}
