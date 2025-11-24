import { useEffect, useState } from 'react';

interface RouteResponse {
  routes: Array<{
    geometry: {
      coordinates: number[][];
    };
  }>;
}

interface RouteGeoJSON {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: {
    type: 'LineString';
    coordinates: number[][];
  };
}

export function useRouting(from: [number, number], to: [number, number]) {
  const [route, setRoute] = useState<RouteGeoJSON | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchRoute = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `http://192.168.1.110:5000/route/v1/car/${from[0]},${from[1]};${to[0]},${to[1]}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data: RouteResponse = await response.json();

        if (isCancelled) return;

        if (data.routes && data.routes.length > 0) {
          setRoute({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: data.routes[0].geometry.coordinates,
            },
          });
        } else {
          setRoute({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [from, to],
            },
          });
        }
      } catch (err) {
        if (!isCancelled) {
          console.warn('Error fetching route:', err);
          setError('Failed to fetch route');
          setRoute({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [from, to],
            },
          });
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchRoute();

    return () => {
      isCancelled = true;
    };
  }, [from[0], from[1], to[0], to[1]]);

  return { route, loading, error };
}
