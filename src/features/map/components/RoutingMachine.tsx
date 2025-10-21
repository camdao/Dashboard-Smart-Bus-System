'use client';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

import 'leaflet-routing-machine';

export default function RoutingMachine() {
  const map = useMap();

  const [vehiclePos, setVehiclePos] = useState<L.LatLngLiteral>({
    lat: 10.762622,
    lng: 106.660172,
  });

  const A = L.latLng(10.762622, 106.660172);
  const B = L.latLng(10.7769, 106.7009);

  const routingAtoCar = useRef<any>(null);
  const routingCarToB = useRef<any>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // 🔹 Giả lập dữ liệu realtime
  useEffect(() => {
    const path = [
      [10.762622, 106.660172],
      [10.766, 106.67],
      [10.77, 106.68],
      [10.774, 106.69],
      [10.7769, 106.7009],
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (i < path.length) {
        setVehiclePos({ lat: path[i][0], lng: path[i][1] });
        i++;
      } else clearInterval(timer);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 Cập nhật route mỗi khi xe di chuyển
  useEffect(() => {
    if (!map) return;

    // Hiển thị marker xe
    if (!markerRef.current) {
      markerRef.current = L.marker(vehiclePos).addTo(map);
    } else {
      markerRef.current.setLatLng(vehiclePos);
    }

    // 🧹 Xóa control cũ an toàn
    try {
      if (routingAtoCar.current) {
        const control = routingAtoCar.current as L.Control & Partial<{ _map: L.Map; _line: unknown }>;
        if (control._map && control._line) control.remove();
      }
      if (routingCarToB.current) {
        const control = routingCarToB.current as L.Control & Partial<{ _map: L.Map; _line: unknown }>;
        if (control._map && control._line) control.remove();
      }
    } catch (err) {
      console.warn('RoutingMachine cleanup skipped:', err);
    }

    // 🗺️ Vẽ lại 2 route mới
    routingAtoCar.current = L.Routing.control({
      waypoints: [A, L.latLng(vehiclePos.lat, vehiclePos.lng)],
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      lineOptions: {
        styles: [{ color: 'gray', dashArray: '6, 6', weight: 5, opacity: 0.7 }],
      },
      createMarker: () => null,
    }).addTo(map);

    routingCarToB.current = L.Routing.control({
      waypoints: [L.latLng(vehiclePos.lat, vehiclePos.lng), B],
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      lineOptions: {
        styles: [{ color: 'blue', weight: 5, opacity: 0.9 }],
      },
      createMarker: () => null,
    }).addTo(map);

    // ✅ Cleanup khi component bị unmount
    return () => {
      try {
        const controlA = routingAtoCar.current as L.Control & Partial<{ _map: L.Map; _line: unknown }>;
        if (controlA._map && controlA._line) controlA.remove();

        const controlB = routingCarToB.current as L.Control & Partial<{ _map: L.Map; _line: unknown }>;
        if (controlB._map && controlB._line) controlB.remove();
      } catch (err) {
        console.warn('RoutingMachine cleanup skipped:', err);
      }
    };
  }, [vehiclePos, map]);

  return null;
}
