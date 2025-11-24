import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { type ApiResponse } from '@/features/login/types/auth';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { type AllRouter } from '../types/router';

export const useGetBuses = (options?: Omit<UseQueryOptions<AllRouter[]>, 'queryKey' | 'queryFn'>) => {
  return useQuery<AllRouter[]>({
    queryKey: ['busesall'],
    queryFn: async () => {
      const res = await client.get<ApiResponse<AllRouter[]>>(`${CLIENT_SIDE_URL}/schedules/router`);
      return res.data;
    },
    ...options,
  });
};

export default useGetBuses;
