import { client } from '@/apis/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { Driver } from '../../types/resourceTypes';
import { ensureArray } from './helpers';

/**
 * Lấy danh sách tất cả drivers (tài xế)
 * @returns Mảng drivers
 */
export const getDrivers = async (): Promise<Driver[]> => {
  try {
    const response = await client.get('/members/drivers');
    return ensureArray<Driver>(response as Driver[] | { data: Driver[] });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any).status = err.response.status;
    }
    throw err;
  }
};

export const useGetDrivers = () => {
  return useQuery({
    queryKey: ['resources', 'drivers'],
    queryFn: getDrivers,
  });
};
