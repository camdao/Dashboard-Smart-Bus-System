import { mapScheduleToEvent } from '@/features/calendar/utils/mapSchedule';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ScheduleRequest } from '../types/scheduleTypes';
import { createSchedule, deleteSchedule, getScheduleById, getSchedules, updateSchedule } from './api';

// Query Keys
const SCHEDULE_QUERY_KEYS = {
  all: ['schedules'] as const,
  lists: () => [...SCHEDULE_QUERY_KEYS.all, 'list'] as const,
  detail: (id: number) => [...SCHEDULE_QUERY_KEYS.all, 'detail', id] as const,
};

// ==================== Query Hooks ====================

/**
 * Hook fetch danh sách schedules
 * Auto-cache, auto-refetch, background updates
 */
export function useSchedulesQuery() {
  return useQuery({
    queryKey: SCHEDULE_QUERY_KEYS.lists(),
    queryFn: async () => {
      const schedules = await getSchedules();
      return schedules.map(mapScheduleToEvent);
    },
    staleTime: 5 * 60 * 1000, // 5 phút - data considered fresh
    gcTime: 10 * 60 * 1000, // 10 phút - garbage collection time
  });
}

/**
 * Hook fetch schedule detail theo ID
 * @param id - ID của schedule cần lấy
 * @param enabled - Có fetch ngay hay không (default: true)
 */
export function useScheduleDetailQuery(id: number, enabled = true) {
  return useQuery({
    queryKey: SCHEDULE_QUERY_KEYS.detail(id),
    queryFn: () => getScheduleById(id),
    enabled,
    staleTime: 5 * 60 * 1000,
    throwOnError: true,
  });
}

// ==================== Mutation Hooks ====================

/**
 * Hook tạo schedule mới với optimistic update
 */
export function useCreateScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onMutate: async (newSchedule: ScheduleRequest) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: SCHEDULE_QUERY_KEYS.lists() });

      // Snapshot the previous value
      const previousSchedules = queryClient.getQueryData(SCHEDULE_QUERY_KEYS.lists());

      // Optimistically update with temporary ID
      const optimisticEvent = mapScheduleToEvent({
        scheduleId: Date.now(), // Temporary ID
        ...newSchedule,
      });

      queryClient.setQueryData<unknown[]>(SCHEDULE_QUERY_KEYS.lists(), (old = []) => [...old, optimisticEvent]);

      return { previousSchedules };
    },
    onError: (_err, _newSchedule, context) => {
      // Rollback on error
      if (context?.previousSchedules) {
        queryClient.setQueryData(SCHEDULE_QUERY_KEYS.lists(), context.previousSchedules);
      }
    },
    onSuccess: () => {
      // Refetch after success
      queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEYS.lists() });
    },
  });
}

/**
 * Hook cập nhật schedule với optimistic update
 */
export function useUpdateScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ScheduleRequest }) => updateSchedule(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: SCHEDULE_QUERY_KEYS.lists() });
      await queryClient.cancelQueries({ queryKey: SCHEDULE_QUERY_KEYS.detail(id) });

      const previousSchedules = queryClient.getQueryData(SCHEDULE_QUERY_KEYS.lists());
      const previousDetail = queryClient.getQueryData(SCHEDULE_QUERY_KEYS.detail(id));

      // Optimistically update list
      const optimisticEvent = mapScheduleToEvent({
        scheduleId: id,
        ...data,
      });

      queryClient.setQueryData<unknown[]>(SCHEDULE_QUERY_KEYS.lists(), (old = []) =>
        old.map((event: unknown) => {
          const e = event as { id: number };
          return e.id === id ? optimisticEvent : event;
        }),
      );

      return { previousSchedules, previousDetail };
    },
    onError: (_err, { id }, context) => {
      if (context?.previousSchedules) {
        queryClient.setQueryData(SCHEDULE_QUERY_KEYS.lists(), context.previousSchedules);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(SCHEDULE_QUERY_KEYS.detail(id), context.previousDetail);
      }
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEYS.detail(id) });
    },
  });
}

/**
 * Hook xóa schedule với optimistic update
 */
export function useDeleteScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchedule,
    onMutate: async (scheduleId: number) => {
      await queryClient.cancelQueries({ queryKey: SCHEDULE_QUERY_KEYS.lists() });

      const previousSchedules = queryClient.getQueryData(SCHEDULE_QUERY_KEYS.lists());

      // Optimistically remove from list
      queryClient.setQueryData<unknown[]>(SCHEDULE_QUERY_KEYS.lists(), (old = []) =>
        old.filter((event: unknown) => {
          const e = event as { id: number };
          return e.id !== scheduleId;
        }),
      );

      return { previousSchedules };
    },
    onError: (_err, _scheduleId, context) => {
      if (context?.previousSchedules) {
        queryClient.setQueryData(SCHEDULE_QUERY_KEYS.lists(), context.previousSchedules);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEYS.lists() });
    },
  });
}

/**
 * Hook tổng hợp - tương thích với API cũ
 */
export function useSchedule() {
  const { data: events = [], isLoading, error, refetch } = useSchedulesQuery();
  const createMutation = useCreateScheduleMutation();
  const updateMutation = useUpdateScheduleMutation();
  const deleteMutation = useDeleteScheduleMutation();

  const loading = isLoading || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const errorMessage =
    error?.message ||
    createMutation.error?.message ||
    updateMutation.error?.message ||
    deleteMutation.error?.message ||
    null;

  return {
    events,
    loading,
    error: errorMessage,
    fetchSchedules: refetch,
    addSchedule: createMutation.mutateAsync,
    updateSchedule: (id: number, data: ScheduleRequest) => updateMutation.mutateAsync({ id, data }),
    removeSchedule: deleteMutation.mutateAsync,
  };
}

// Re-export for backward compatibility
export { getScheduleById };
export type { ScheduleRequest };
