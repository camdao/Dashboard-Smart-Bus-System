import { useEffect, useState } from 'react';
import type { CalendarEvent } from '@/features/calendar/types/scheduleTypes';

import { useAddSchedule } from './useAddSchedule';
import { useFetchSchedules } from './useFetchSchedules';
import { useRemoveSchedule } from './useRemoveSchedule';

// Re-export types and API functions for backward compatibility
export type { ScheduleRequest } from '@/features/calendar/types/scheduleTypes';

/**
 * Hook tổng hợp để quản lý schedules
 * Kết hợp fetch, add, remove và đồng bộ local state
 * Tránh lặp code bằng cách tái sử dụng các hook chuyên biệt
 */
export function useSchedule() {
  // Fetch schedules và auto-load
  const { events: fetchedEvents, loading: fetchLoading, error: fetchError, refetch } = useFetchSchedules();

  // Add schedule mutation
  const { addSchedule: addScheduleApi, loading: addLoading, error: addError } = useAddSchedule();

  // Remove schedule mutation
  const { removeSchedule: removeScheduleApi, loading: removeLoading, error: removeError } = useRemoveSchedule();

  // Local state để quản lý events (kết hợp fetch + optimistic updates)
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Sync fetched events to local state
  useEffect(() => {
    setEvents(fetchedEvents);
  }, [fetchedEvents]);

  // Wrapper cho addSchedule với refetch sau khi thành công
  const addSchedule = async (scheduleData: Parameters<typeof addScheduleApi>[0]) => {
    const newEvent = await addScheduleApi(scheduleData);
    // Refetch để đảm bảo data sync với server
    await refetch();
    return newEvent;
  };

  // Wrapper cho removeSchedule với refetch sau khi thành công
  const removeSchedule = async (id: number) => {
    await removeScheduleApi(id);
    // Refetch để đảm bảo data sync với server
    await refetch();
  };

  const loading = fetchLoading || addLoading || removeLoading;
  const error = fetchError || addError || removeError;

  return {
    events: events.length > 0 ? events : fetchedEvents,
    loading,
    error,
    fetchSchedules: refetch,
    addSchedule,
    removeSchedule,
  };
}
