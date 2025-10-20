'use client';

import DashboardContainers from '@/features/LayoutAdmin/containers/DashboardContainers';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import RoutingMachine from '../components/RoutingMachine';

import '@/features/map/utils/leafletFix';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

export default function MapFeatures() {
  return (
    <DashboardContainers>
      <MapContainer
        center={[10.7769, 106.7009]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[10.7769, 106.7009]}>
          <Popup>Xin chào từ TP.HCM!</Popup>
        </Marker>
        <RoutingMachine />
      </MapContainer>
    </DashboardContainers>
  );
}
