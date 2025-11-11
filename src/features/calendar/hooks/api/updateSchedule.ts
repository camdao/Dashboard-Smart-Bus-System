import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { type ScheduleRequest, type ScheduleResponse } from '../../types/scheduleTypes';

/**
 * Cập nhật thông tin schedule
 * @param id - ID của schedule cần cập nhật
 * @param data - Thông tin mới của schedule
 * @returns Schedule đã được cập nhật
 */
export const updateSchedule = async (id: number, data: ScheduleRequest): Promise<ScheduleResponse> => {
  try {
    const response = await client.put<ScheduleRequest, ScheduleResponse>(`${CLIENT_SIDE_URL}/schedules/${id}`, data);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      (err as any).status = err.response.status;
    }
    throw err;
  }
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ScheduleRequest }) => updateSchedule(id, data),
    onSuccess: (_, variables) => {
      // Invalidate danh sách schedules
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      // Invalidate schedule detail
      queryClient.invalidateQueries({ queryKey: ['schedules', variables.id] });
    },
  });
};
