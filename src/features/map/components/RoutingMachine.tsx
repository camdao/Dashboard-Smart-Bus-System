'use client';
import { useEffect, useState } from 'react';

import { useRouting } from '../hooks/useRouting';
import MapContainer from './MapContainer';
import RouteLayer from './RouteLayer';
import VehicleMarker from './VehicleMarker';

export default function RoutingMachine() {
  const [vehiclePos, setVehiclePos] = useState<[number, number]>([106.660172, 10.762622]);

  const A: [number, number] = [106.660172, 10.762622];
  const B: [number, number] = [106.7009, 10.7769];

  const { route: routeAToCar } = useRouting(A, vehiclePos);
  const { route: routeCarToB } = useRouting(vehiclePos, B);

  useEffect(() => {
    const path: [number, number][] = [
      [106.660172, 10.762622],
      [106.67, 10.766],
      [106.68, 10.77],
      [106.69, 10.774],
      [106.7009, 10.7769],
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (i < path.length) {
        setVehiclePos(path[i]);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MapContainer initialLongitude={106.680172} initialLatitude={10.7695} initialZoom={12}>
      <RouteLayer id="a-to-car" route={routeAToCar} color="#888" width={5} opacity={0.7} dashArray={[2, 2]} />
      <RouteLayer id="car-to-b" route={routeCarToB} color="#4285F4" width={5} opacity={0.9} />
      <VehicleMarker longitude={A[0]} latitude={A[1]} color="#4CAF50" size={16} label="Start" />
      <VehicleMarker longitude={vehiclePos[0]} latitude={vehiclePos[1]} color="#FF5722" size={20} label="Vehicle" />
      <VehicleMarker longitude={B[0]} latitude={B[1]} color="#2196F3" size={16} label="End" />
    </MapContainer>
  );
}
