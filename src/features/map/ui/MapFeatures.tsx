'use client';

import DashboardContainers from '@/features/LayoutAdmin/containers/DashboardContainers';

import MapLibreRouting from '../components/RoutingMachine';

export default function MapFeatures() {
  return (
    <DashboardContainers>
      <MapLibreRouting />
    </DashboardContainers>
  );
}
