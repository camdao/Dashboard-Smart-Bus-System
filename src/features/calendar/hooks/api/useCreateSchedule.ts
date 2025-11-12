import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { type ScheduleRequest, type ScheduleResponse } from '../../types/scheduleTypes';

export const useCreateSchedule = (options?: UseMutationOptions<ScheduleResponse, unknown, ScheduleRequest>) => {
  return useMutation<ScheduleResponse, unknown, ScheduleRequest>({
    mutationFn: (data: ScheduleRequest) => client.post(`${CLIENT_SIDE_URL}/schedules`, data),
    ...options,
  });
};

export default useCreateSchedule;
