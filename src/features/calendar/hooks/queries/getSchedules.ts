import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { type ScheduleResponse } from '../../types/scheduleTypes';

export const useGetSchedules = (options?: UseQueryOptions<ScheduleResponse[]>) => {
  return useQuery<ScheduleResponse[]>({
    queryKey: ['schedules'],
    queryFn: () => client.get(`${CLIENT_SIDE_URL}/schedules`),
    ...options,
  });
};

export default useGetSchedules;