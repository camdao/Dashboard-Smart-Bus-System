import { client } from '@/apis/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { Bus } from '../../types/resourceTypes';
import { ensureArray } from './helpers';

/**
 * Lấy danh sách tất cả buses (xe bus)
 * @returns Mảng buses
 */
export const getBuses = async (): Promise<Bus[]> => {
  try {
    const response = await client.get('/buses');
    return ensureArray<Bus>(response as Bus[] | { data: Bus[] });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any).status = err.response.status;
    }
    throw err;
  }
};

export const useGetBuses = () => {
  return useQuery({
    queryKey: ['resources', 'buses'],
    queryFn: getBuses,
  });
};
