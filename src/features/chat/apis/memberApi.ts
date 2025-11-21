import { client } from '@/apis/client';
import { useQuery } from '@tanstack/react-query';

export interface MemberResponse {
  id: number;
  username: string;
  role: 'ADMIN' | 'DRIVER' | 'PASSENGER';
  fullName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  isActive?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  timestamp: string;
}

export async function getAllNonAdmins(): Promise<MemberResponse[]> {
  const response = await client.get('/members/non-admins');
  const apiResponse = response as ApiResponse<MemberResponse[]>;
  return apiResponse.data;
}

export async function getAllDrivers(): Promise<MemberResponse[]> {
  const response = await client.get('/members/drivers');
  const apiResponse = response as ApiResponse<MemberResponse[]>;
  return apiResponse.data;
}

interface UserInfo {
  id: number;
  username: string;
  email?: string;
  role?: string;
}

export const getUserInfo = async (userId: string | null): Promise<UserInfo> => {
  const response = await client.get(`/members/${userId}`);
  const apiResponse = response as ApiResponse<UserInfo>;
  return apiResponse.data;
};

export const useUserInfo = (userId: string | null) => {
  return useQuery({
    queryKey: ['userInfo', userId],
    queryFn: () => getUserInfo(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
