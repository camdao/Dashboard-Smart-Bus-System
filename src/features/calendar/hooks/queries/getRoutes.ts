import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { Route } from '../../types/resourceTypes';

export const useGetRoutes = (options?: Omit<UseQueryOptions<Route[]>, 'queryKey' | 'queryFn'>) => {
  return useQuery<Route[]>({
    queryKey: ['routes'],
    queryFn: () => client.get(`${CLIENT_SIDE_URL}/routers`),
    ...options,
  });
};

export default useGetRoutes;
