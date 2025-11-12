import type { CalendarEvent, ScheduleRequest } from '@/features/calendar/types/scheduleTypes';

import { useAddSchedule } from './useAddSchedule';
import { useFetchSchedules } from './useFetchSchedules';
import { useRemoveSchedule } from './useRemoveSchedule';
import { useUpdateScheduleHook } from './useUpdateSchedule';

export function useSchedule() {
  const { events: fetchedEvents, loading: fetchLoading, error: fetchError, refetch } = useFetchSchedules();

  const { addSchedule: addScheduleApi, loading: addLoading, error: addError } = useAddSchedule();

  const { removeSchedule: removeScheduleApi, loading: removeLoading, error: removeError } = useRemoveSchedule();

  const { updateSchedule: updateScheduleApi, loading: updateLoading, error: updateError } = useUpdateScheduleHook();

  // Bỏ state events và useEffect không cần thiết

  const addSchedule = async (scheduleData: ScheduleRequest): Promise<CalendarEvent> => {
    const newEvent = await addScheduleApi(scheduleData);
    await refetch();
    return newEvent;
  };

  const removeSchedule = async (id: number): Promise<void> => {
    await removeScheduleApi(id);
    await refetch();
  };

  const updateSchedule = async (id: number, scheduleData: ScheduleRequest): Promise<void> => {
    await updateScheduleApi(id, scheduleData);
    await refetch();
  };

  const loading = fetchLoading || addLoading || removeLoading || updateLoading;
  const error = fetchError || addError || removeError || updateError;

  return {
    events: fetchedEvents, // Trực tiếp return fetchedEvents
    loading,
    error,
    fetchSchedules: refetch,
    addSchedule,
    removeSchedule,
    updateSchedule,
  };
}

export type { CalendarEvent, ScheduleRequest };
