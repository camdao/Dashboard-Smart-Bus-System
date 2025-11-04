'use client';
import { Layer, Source } from 'react-map-gl/maplibre';

interface RouteGeoJSON {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: {
    type: 'LineString';
    coordinates: number[][];
  };
}

interface RouteLayerProps {
  id: string;
  route: RouteGeoJSON | null;
  color?: string;
  width?: number;
  opacity?: number;
  dashArray?: number[];
}

export default function RouteLayer({
  id,
  route,
  color = '#4285F4',
  width = 5,
  opacity = 0.9,
  dashArray,
}: RouteLayerProps) {
  if (!route) return null;

  return (
    <Source id={`route-source-${id}`} type="geojson" data={route}>
      <Layer
        id={`route-layer-${id}`}
        type="line"
        paint={{
          'line-color': color,
          'line-width': width,
          'line-opacity': opacity,
          ...(dashArray && { 'line-dasharray': dashArray }),
        }}
      />
    </Source>
  );
}
