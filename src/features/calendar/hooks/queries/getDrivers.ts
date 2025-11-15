import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { Driver } from '../../types/resourceTypes';

export const useGetDrivers = (options?: Omit<UseQueryOptions<Driver[]>, 'queryKey' | 'queryFn'>) => {
  return useQuery<Driver[]>({
    queryKey: ['drivers'],
    queryFn: () => client.get(`${CLIENT_SIDE_URL}/members/drivers`),
    ...options,
  });
};

export default useGetDrivers;
