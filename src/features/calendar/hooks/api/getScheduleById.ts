import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { type ScheduleDetailResponse } from '../../types/scheduleTypes';
import { unwrapResponse } from './helpers';

/**
 * Lấy chi tiết schedule theo ID
 * @param id - ID của schedule
 * @returns Chi tiết schedule bao gồm thông tin bus, router, driver
 */
export const getScheduleById = async (id: number): Promise<ScheduleDetailResponse> => {
  try {
    const response = await client.get<ScheduleDetailResponse>(`${CLIENT_SIDE_URL}/schedules/${id}`);
    return unwrapResponse(response);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any).status = err.response.status;
    }
    throw err;
  }
};

export const useGetScheduleById = (id: number) => {
  return useQuery({
    queryKey: ['schedules', id],
    queryFn: () => getScheduleById(id),
    enabled: !!id, // Chỉ fetch khi có id
  });
};
