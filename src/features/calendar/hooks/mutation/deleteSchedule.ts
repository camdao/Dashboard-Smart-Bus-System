import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export const useDeleteSchedule = (options?: UseMutationOptions<void, unknown, number>) => {
  return useMutation<void, unknown, number>({
    mutationFn: async (id: number): Promise<void> => {
      await client.delete(`${CLIENT_SIDE_URL}/schedules/${id}`);
    },
    ...options,
  });
};

export default useDeleteSchedule;
