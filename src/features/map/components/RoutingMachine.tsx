'use client';

import { useGetBuses } from '../hooks/useGetAllRouter';
import { useRouting } from '../hooks/useRouting';
import { type Bus, type Router } from '../types/router';
import MapContainer from './MapContainer';
import RouteLayer from './RouteLayer';
import VehicleMarker from './VehicleMarker';

function parseLatLng(loc: string): [number, number] {
  const [lng, lat] = loc.split(',').map(Number);
  return [lng, lat];
}

function BusRoute({ bus, router }: { bus: Bus; router: Router }) {
  const A = parseLatLng(router.startLocation);
  const B = parseLatLng(router.endLocation);
  const vehiclePos: [number, number] = bus.location ? (bus.location.split(',').map(Number) as [number, number]) : A;
  const { route: routeAToCar } = useRouting(A, vehiclePos);
  const { route: routeCarToB } = useRouting(vehiclePos, B);

  return (
    <>
      <RouteLayer
        id={`a-to-car-${bus.id}-${router.id}`}
        route={routeAToCar}
        color="#888"
        width={5}
        opacity={0.7}
        dashArray={[2, 2]}
      />
      <RouteLayer id={`car-to-b-${bus.id}-${router.id}`} route={routeCarToB} color="#4285F4" width={5} opacity={0.9} />
      <VehicleMarker longitude={A[0]} latitude={A[1]} color="#4CAF50" size={16} label="Start" />
      <VehicleMarker longitude={vehiclePos[0]} latitude={vehiclePos[1]} color="#FF5722" size={20} label="Vehicle" />
      <VehicleMarker longitude={B[0]} latitude={B[1]} color="#2196F3" size={16} label="End" />
    </>
  );
}
export default function RoutingMachine() {
  const { data: allBus, isLoading, isError } = useGetBuses();

  if (isLoading) return <div>Loading buses...</div>;
  if (isError || !allBus) return <div>Error loading buses</div>;

  return (
    <MapContainer initialLongitude={106.680172} initialLatitude={10.7695} initialZoom={12}>
      {allBus.map(({ bus, router }) => (
        <BusRoute key={`${bus.id}-${router.id}`} bus={bus} router={router} />
      ))}
    </MapContainer>
  );
}
