import { useState } from 'react';
import { deleteSchedule } from '@/features/calendar/hooks/api';

export function useRemoveSchedule() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeSchedule = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await deleteSchedule(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể xóa lịch làm việc';
      setError(errorMessage);
      console.error('Error deleting schedule:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    removeSchedule,
    loading,
    error,
  };
}
