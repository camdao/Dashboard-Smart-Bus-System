import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { type ScheduleRequest, type ScheduleResponse } from '../../types/scheduleTypes';

export const createSchedule = async (data: ScheduleRequest): Promise<ScheduleResponse> => {
  try {
    const response = await client.post<ScheduleRequest, ScheduleResponse>(`${CLIENT_SIDE_URL}/schedules`, data);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any).status = err.response.status;
    }
    throw err;
  }
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};
