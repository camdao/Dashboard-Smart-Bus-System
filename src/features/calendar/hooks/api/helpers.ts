/**
 * Helper to unwrap backend response if wrapped in ApiResponse structure
 * Backend có thể trả về: { data: T, status: string, message: string }
 * hoặc trực tiếp T
 */
export const unwrapResponse = <T>(response: T | { data: T }): T => {
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response;
};

/**
 * Ensure the result is always an array
 */
export const ensureArray = <T>(value: T | T[] | { data: T[] }): T[] => {
  const unwrapped = unwrapResponse(value);
  return Array.isArray(unwrapped) ? unwrapped : [];
};
