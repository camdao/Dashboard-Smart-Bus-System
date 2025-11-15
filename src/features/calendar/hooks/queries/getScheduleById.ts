import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { type ScheduleDetailResponse, type ScheduleDetailResponseDTO } from '../../types/scheduleTypes';

export const useGetScheduleById = (
  id: number,
  options?: Omit<UseQueryOptions<ScheduleDetailResponse, Error, ScheduleDetailResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<ScheduleDetailResponse, Error, ScheduleDetailResponse>({
    queryKey: ['schedules', id],
    queryFn: async () => {
      const res = await client.get<ScheduleDetailResponseDTO>(`${CLIENT_SIDE_URL}/schedules/${id}`);
      return res.data;
    },
    ...options,
  });
};

export default useGetScheduleById;
