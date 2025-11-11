import { useEffect, useState } from 'react';
import type { Bus, Driver, Route } from '@/features/calendar/types/resourceTypes';

import { getBuses, getDrivers, getRoutes, } from './api';

export function useResources() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const [routesData, driversData, busesData] = await Promise.all([getRoutes(), getDrivers(), getBuses()]);

        // Normalize / sanitize returned data so callers can rely on stable shapes
        const normalizeRoute = (r: unknown) => {
          if (!r) return null;
          const rr = r as Record<string, unknown>;
          const id = Number(rr.id ?? rr.routerId ?? rr.routeId ?? null);
          const routerName = (rr.routerName ?? rr.name ?? rr.routeName ?? rr.router_name ?? '') as string;
          if (!id || !routerName) return null;
          return { id, routerName } as Route;
        };

        const normalizeDriver = (d: unknown) => {
          if (!d) return null;
          const dd = d as Record<string, unknown>;
          const id = Number(dd.id ?? dd.driverId ?? null);
          const name = (dd.name ?? dd.fullName ?? dd.username ?? '') as string;
          if (!id || !name) return null;
          return { id, name } as Driver;
        };

        const normalizeBus = (b: unknown) => {
          if (!b) return null;
          const bb = b as Record<string, unknown>;
          const id = Number(bb.id ?? bb.busId ?? null);
          // backend may return busNumber or licensePlate
          const busNumber = (bb.busNumber ?? bb.bus_number ?? bb.licensePlate ?? bb.plate ?? '') as string;
          if (!id || !busNumber) return null;
          return { id, busNumber } as Bus;
        };

        const cleanRoutes = Array.isArray(routesData)
          ? (routesData.map(normalizeRoute).filter(Boolean) as Route[])
          : [];
        const cleanDrivers = Array.isArray(driversData)
          ? (driversData.map(normalizeDriver).filter(Boolean) as Driver[])
          : [];
        const cleanBuses = Array.isArray(busesData) ? (busesData.map(normalizeBus).filter(Boolean) as Bus[]) : [];

        setRoutes(cleanRoutes);
        setDrivers(cleanDrivers);
        setBuses(cleanBuses);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Không thể tải dữ liệu';
        setError(errorMessage);
        console.error('Error fetching resources:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return {
    routes,
    drivers,
    buses,
    loading,
    error,
  };
}
