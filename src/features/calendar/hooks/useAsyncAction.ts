import { useCallback, useState } from 'react';

/**
 * Hook tái sử dụng để quản lý loading state và error handling cho async actions
 * Giảm thiểu code lặp lại trong các mutation hooks
 */
export function useAsyncAction<T extends (...args: never[]) => Promise<unknown>>(
  action: T,
  options?: {
    onSuccess?: (result: Awaited<ReturnType<T>>) => void;
    onError?: (error: Error) => void;
    successMessage?: string;
    errorMessage?: string;
  },
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: Parameters<T>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await action(...args);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : options?.errorMessage || 'Đã xảy ra lỗi';
        setError(errorMessage);
        console.error('Async action error:', err);
        options?.onError?.(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [action, options],
  );

  return {
    execute,
    loading,
    error,
    clearError: () => setError(null),
  };
}
