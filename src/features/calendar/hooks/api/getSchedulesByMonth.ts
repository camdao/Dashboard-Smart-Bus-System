import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { type ScheduleResponse } from '../../types/scheduleTypes';
import { ensureArray } from './helpers';

/**
 * Lấy danh sách schedules theo tháng
 * @param year - Năm cần lọc
 * @param month - Tháng cần lọc (1-12)
 * @returns Mảng schedules trong tháng
 */
export const getSchedulesByMonth = async (year: number, month: number): Promise<ScheduleResponse[]> => {
  try {
    const response = await client.get<ScheduleResponse[]>(`${CLIENT_SIDE_URL}/schedules`, {
      params: { year, month },
    });
    return ensureArray(response);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any).status = err.response.status;
    }
    throw err;
  }
};

export const useGetSchedulesByMonth = (year: number, month: number) => {
  return useQuery({
    queryKey: ['schedules', 'month', year, month],
    queryFn: () => getSchedulesByMonth(year, month),
  });
};
