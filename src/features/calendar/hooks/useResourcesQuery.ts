import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getBuses, getDrivers, getRoutes } from './api';

const RESOURCE_QUERY_KEYS = {
  all: ['resources'] as const,
  routes: () => [...RESOURCE_QUERY_KEYS.all, 'routes'] as const,
  drivers: () => [...RESOURCE_QUERY_KEYS.all, 'drivers'] as const,
  buses: () => [...RESOURCE_QUERY_KEYS.all, 'buses'] as const,
};


function normalizeResource(item: unknown) {
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

// ==================== Query Hooks ====================


export function useRoutesQuery() {
  return useQuery({
    queryKey: RESOURCE_QUERY_KEYS.routes(),
    queryFn: async () => {
      const routes = await getRoutes();
      return routes.map(normalizeResource);
    },
    staleTime: 10 * 60 * 1000, // 10 phút - routes change infrequently
    gcTime: 15 * 60 * 1000,
  });
}


export function useDriversQuery() {
  return useQuery({
    queryKey: RESOURCE_QUERY_KEYS.drivers(),
    queryFn: async () => {
      const drivers = await getDrivers();
      return drivers.map(normalizeResource);
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
}


export function useBusesQuery() {
  return useQuery({
    queryKey: RESOURCE_QUERY_KEYS.buses(),
    queryFn: async () => {
      const buses = await getBuses();
      return buses.map(normalizeResource);
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
}

// ==================== Composed Hook ====================


export function useResourcesQuery() {
  const routesQuery = useRoutesQuery();
  const driversQuery = useDriversQuery();
  const busesQuery = useBusesQuery();

  const loading = routesQuery.isLoading || driversQuery.isLoading || busesQuery.isLoading;

  const error = routesQuery.error?.message || driversQuery.error?.message || busesQuery.error?.message || null;

  return {
    routes: routesQuery.data || [],
    drivers: driversQuery.data || [],
    buses: busesQuery.data || [],
    loading,
    error,
    refetchAll: () => {
      routesQuery.refetch();
      driversQuery.refetch();
      busesQuery.refetch();
    },
  };
}


export function usePrefetchResources() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: RESOURCE_QUERY_KEYS.routes(),
      queryFn: async () => {
        const routes = await getRoutes();
        return routes.map(normalizeResource);
      },
    });
    queryClient.prefetchQuery({
      queryKey: RESOURCE_QUERY_KEYS.drivers(),
      queryFn: async () => {
        const drivers = await getDrivers();
        return drivers.map(normalizeResource);
      },
    });
    queryClient.prefetchQuery({
      queryKey: RESOURCE_QUERY_KEYS.buses(),
      queryFn: async () => {
        const buses = await getBuses();
        return buses.map(normalizeResource);
      },
    });
  };
}
