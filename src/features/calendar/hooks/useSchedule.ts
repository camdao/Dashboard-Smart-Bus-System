import { useMemo } from 'react';
import useUpdateSchedule from '@/features/calendar/hooks/mutation/updateSchedule';
import type { ScheduleResponse } from '@/features/calendar/types/scheduleTypes';
import { mapScheduleToEvent } from '@/features/calendar/utils/mapSchedule';
import { useQueryClient } from '@tanstack/react-query';

import useDeleteSchedule from './mutation/deleteSchedule';
import useCreateSchedule from './mutation/useCreateSchedule';
import { useGetScheduleById } from './queries/getScheduleById';
import { useGetSchedules } from './queries/getSchedules';

type ApiResponse = ScheduleResponse[] | { data: ScheduleResponse[] };

export function useSchedule() {
  const queryClient = useQueryClient();
  const { data: schedules = [], refetch } = useGetSchedules();

  const unwrappedSchedules = useMemo(() => {
    const response = schedules as ApiResponse;
    if (Array.isArray(response)) return response;
    if (response && typeof response === 'object' && 'data' in response) {
      return Array.isArray(response.data) ? response.data : [];
    }
    return [];
  }, [schedules]);

  const events = useMemo(() => unwrappedSchedules.map(mapScheduleToEvent), [unwrappedSchedules]);

  const createMutation = useCreateSchedule({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const updateMutation = useUpdateSchedule({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const deleteMutation = useDeleteSchedule({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const loading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return {
    events,
    loading,
    fetchSchedules: refetch,
    createMutation,
    updateMutation,
    deleteMutation,
    useGetScheduleById,
  };
}
