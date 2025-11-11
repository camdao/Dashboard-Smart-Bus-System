import { client } from '@/apis/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { Route } from '../../types/resourceTypes';
import { ensureArray } from './helpers';

/**
 * Lấy danh sách tất cả routes (tuyến đường)
 * @returns Mảng routes
 */
export const getRoutes = async (): Promise<Route[]> => {
  try {
    const response = await client.get('/routers');
    return ensureArray<Route>(response as Route[] | { data: Route[] });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any).status = err.response.status;
    }
    throw err;
  }
};

export const useGetRoutes = () => {
  return useQuery({
    queryKey: ['resources', 'routes'],
    queryFn: getRoutes,
  });
};
