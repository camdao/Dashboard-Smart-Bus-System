import { useMemo } from 'react';
import useUpdateSchedule from '@/features/calendar/hooks/mutation/updateSchedule';
import type { CalendarEvent, ScheduleRequest, ScheduleResponse } from '@/features/calendar/types/scheduleTypes';
import { mapScheduleToEvent } from '@/features/calendar/utils/mapSchedule';
import { useQueryClient } from '@tanstack/react-query';

import useDeleteSchedule from './mutation/deleteSchedule';
import useCreateSchedule from './mutation/useCreateSchedule';
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

  const { mutateAsync: createSchedule, isPending: addLoading } = useCreateSchedule();
  const { mutateAsync: updateScheduleMutation, isPending: updateLoading } = useUpdateSchedule();
  const { mutateAsync: deleteScheduleMutation, isPending: deleteLoading } = useDeleteSchedule();

  const addSchedule = async (scheduleData: ScheduleRequest): Promise<CalendarEvent> => {
    const created = await createSchedule(scheduleData);

    const scheduleResponse = (created as { data?: ScheduleResponse })?.data || (created as ScheduleResponse);
    const newEvent = mapScheduleToEvent(scheduleResponse);

    await queryClient.invalidateQueries({ queryKey: ['schedules'] });

    return newEvent;
  };

  const removeSchedule = async (id: number): Promise<void> => {
    await deleteScheduleMutation(id);
    await queryClient.invalidateQueries({ queryKey: ['schedules'] });
  };

  const updateSchedule = async (id: number, scheduleData: ScheduleRequest): Promise<void> => {
    await updateScheduleMutation({ id, data: scheduleData });
    await queryClient.invalidateQueries({ queryKey: ['schedules'] });
  };

  const loading = addLoading || updateLoading || deleteLoading;

  return {
    events,
    loading,
    fetchSchedules: refetch,
    addSchedule,
    removeSchedule,
    updateSchedule,
  };
}
