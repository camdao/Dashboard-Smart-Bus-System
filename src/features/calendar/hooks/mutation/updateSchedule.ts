import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useMutation, type UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { type ScheduleRequest, type ScheduleResponse } from '../../types/scheduleTypes';

export const useUpdateSchedule = (options?: UseMutationOptions<ScheduleResponse, unknown, { id: number; data: ScheduleRequest }>) => {
  const queryClient = useQueryClient();

  return useMutation<ScheduleResponse, unknown, { id: number; data: ScheduleRequest }>({
    mutationFn: ({ id, data }) => client.put(`${CLIENT_SIDE_URL}/schedules/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedules', variables.id] });
    },
    ...options,
  });
};

export default useUpdateSchedule;