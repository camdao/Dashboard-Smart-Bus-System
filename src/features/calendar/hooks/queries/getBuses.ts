import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { Bus } from '../../types/resourceTypes';

export const useGetBuses = (options?: Omit<UseQueryOptions<Bus[]>, 'queryKey' | 'queryFn'>) => {
  return useQuery<Bus[]>({
    queryKey: ['buses'],
    queryFn: () => client.get(`${CLIENT_SIDE_URL}/buses`),
    ...options,
  });
};

export default useGetBuses;
