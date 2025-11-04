'use client';
import { type ReactNode, useRef } from 'react';
import Map, { type MapRef, NavigationControl } from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

interface MapContainerProps {
  children?: ReactNode;
  initialLongitude?: number;
  initialLatitude?: number;
  initialZoom?: number;
  height?: string;
  mapStyle?: string;
}

export default function MapContainer({
  children,
  initialLongitude = 106.680172,
  initialLatitude = 10.7695,
  initialZoom = 12,
  height = 'calc(100vh - 200px)',
  mapStyle = 'https://api.maptiler.com/maps/basic-v2/style.json?key=Uemr1ZRFUvxmxq3g5Cz8',
}: MapContainerProps) {
  const mapRef = useRef<MapRef>(null);

  return (
    <div style={{ width: '100%', height }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
          zoom: initialZoom,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
      >
        <NavigationControl position="top-right" />
        {children}
      </Map>
    </div>
  );
}
