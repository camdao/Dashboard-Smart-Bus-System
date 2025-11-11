import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { type ScheduleResponse } from '../../types/scheduleTypes';
import { ensureArray } from './helpers';

/**
 * Lấy danh sách tất cả schedules
 * @returns Mảng schedules
 */
export const getSchedules = async (): Promise<ScheduleResponse[]> => {
  try {
    const response = await client.get<ScheduleResponse[]>(`${CLIENT_SIDE_URL}/schedules`);
    return ensureArray(response);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any).status = err.response.status;
    }
    throw err;
  }
};

export const useGetSchedules = () => {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: getSchedules,
  });
};
