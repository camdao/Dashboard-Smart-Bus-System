import { useMemo } from 'react';
import { useGetSchedules } from '@/features/calendar/hooks/api';
import type { ScheduleResponse } from '@/features/calendar/types/scheduleTypes';
import { mapScheduleToEvent } from '@/features/calendar/utils/mapSchedule';

type ApiResponse = ScheduleResponse[] | { data: ScheduleResponse[] };

export function useFetchSchedules() {
  const { data: schedules = [], isLoading: loading, error: queryError, refetch } = useGetSchedules();

  const unwrappedSchedules = useMemo(() => {
    const response = schedules as ApiResponse;

    if (Array.isArray(response)) return response;
    if (response && typeof response === 'object' && 'data' in response) {
      return Array.isArray(response.data) ? response.data : [];
    }
    return [];
  }, [schedules]);

  const events = useMemo(() => unwrappedSchedules.map(mapScheduleToEvent), [unwrappedSchedules]);

  const error = queryError ? (queryError instanceof Error ? queryError.message : 'Không thể tải lịch làm việc') : null;

  return {
    events,
    loading,
    error,
    refetch,
  };
}
