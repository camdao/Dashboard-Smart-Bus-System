'use client';
import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
export default function RoutingMachine() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(10.762622, 106.660172), L.latLng(10.776889, 106.700806)],
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map]);

  return null;
}
