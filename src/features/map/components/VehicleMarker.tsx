'use client';
import { Marker } from 'react-map-gl/maplibre';

interface VehicleMarkerProps {
  longitude: number;
  latitude: number;
  color?: string;
  size?: number;
  label?: string;
}

export default function VehicleMarker({
  longitude,
  latitude,
  color = '#FF5722',
  size = 20,
  label,
}: VehicleMarkerProps) {
  return (
    <Marker longitude={longitude} latitude={latitude} anchor="center">
      <div style={{ position: 'relative' }}>
        <div
          style={{
            backgroundColor: color,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            border: '3px solid white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
            cursor: 'pointer',
          }}
        />
        {label && (
          <div
            style={{
              position: 'absolute',
              top: `${size + 5}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {label}
          </div>
        )}
      </div>
    </Marker>
  );
}
