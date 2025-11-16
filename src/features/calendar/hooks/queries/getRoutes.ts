import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { Route, RouteDTO } from '../../types/resourceTypes';

export const useGetRoutes = (options?: Omit<UseQueryOptions<Route[], Error>, 'queryKey' | 'queryFn'>) => {
  return useQuery<Route[]>({
    queryKey: ['routes'],
    queryFn: async () => {
      const response = await client.get<RouteDTO>(`${CLIENT_SIDE_URL}/routers`);
      return response.data ?? [];
    },
    ...options,
  });
};

export default useGetRoutes;
