import { useMemo } from 'react';

import { useGetBuses } from './queries/getBuses';
import { useGetDrivers } from './queries/getDrivers';
import { useGetRoutes } from './queries/getRoutes';

type ResourceItem = {
  id: number;
  title: string;
};

type ApiResponse<T> = T[] | { data: T[] };

function normalizeResource(item: unknown): ResourceItem {
  const resource = item as Record<string, unknown>;
  return {
    id: (resource.id || resource.routeId || resource.driverId || resource.busId) as number,
    title: (resource.title ||
      resource.name ||
      resource.username ||
      resource.routeName ||
      resource.routerName ||
      resource.driverName ||
      resource.busNumber ||
      resource.licensePlate) as string,
  };
}

export function useResourcesQuery() {
  const { data: routesData = [], refetch: refetchRoutes, isLoading: routesLoading } = useGetRoutes();
  const { data: driversData = [], refetch: refetchDrivers, isLoading: driversLoading } = useGetDrivers();
  const { data: busesData = [], refetch: refetchBuses, isLoading: busesLoading } = useGetBuses();

  const routes = useMemo(() => routesData?.map(normalizeResource) ?? [], [routesData]);

  const drivers = useMemo(() => {
    const response = driversData as ApiResponse<unknown>;
    const unwrapped = Array.isArray(response)
      ? response
      : response && typeof response === 'object' && 'data' in response
        ? Array.isArray(response.data)
          ? response.data
          : []
        : [];
    return unwrapped.map(normalizeResource);
  }, [driversData]);

  const buses = useMemo(() => {
    const response = busesData as ApiResponse<unknown>;
    const unwrapped = Array.isArray(response)
      ? response
      : response && typeof response === 'object' && 'data' in response
        ? Array.isArray(response.data)
          ? response.data
          : []
        : [];
    return unwrapped.map(normalizeResource);
  }, [busesData]);

  const loading = routesLoading || driversLoading || busesLoading;

  const refetchAll = () => {
    refetchRoutes();
    refetchDrivers();
    refetchBuses();
  };

  return {
    routes,
    drivers,
    buses,
    loading,
    refetchAll,
  };
}
