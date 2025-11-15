import { client } from '@/apis/client';

export interface MemberResponse {
  id: number;
  username: string;
  role: 'ADMIN' | 'DRIVER' | 'PASSENGER';
  fullName?: string; // Optional since API doesn't return it
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

// Fetch all non-admin members for chat
export async function getAllNonAdmins(): Promise<MemberResponse[]> {
  const response = await client.get('/members/non-admins');
  const apiResponse = response as ApiResponse<MemberResponse[]>;
  return apiResponse.data;
}

// Fetch all drivers
export async function getAllDrivers(): Promise<MemberResponse[]> {
  const response = await client.get('/members/drivers');
  const apiResponse = response as ApiResponse<MemberResponse[]>;
  return apiResponse.data;
}
