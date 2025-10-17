'use client';
import Dashboard from '@/features/LayoutAdmin/containers/DashboardContainers';
import { MapContainer, TileLayer } from 'react-leaflet';

import RoutingMachine from './RoutingMachine';

import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

export default function MapFeatures() {
  return (
    <Dashboard>
      <MapContainer
        center={[10.7769, 106.7009]}
        zoom={12}
        style={{ height: '500px', width: '100%' }}
        maxBounds={[
          [10.6, 106.5],
          [10.9, 107.0],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <RoutingMachine />
      </MapContainer>
    </Dashboard>
  );
}
