'use client';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

interface RouteResponse {
  routes: Array<{
    geometry: {
      coordinates: number[][];
    };
  }>;
}

export default function RoutingMachine() {
  const map = useMap();

  const [vehiclePos, setVehiclePos] = useState<L.LatLngLiteral>({
    lat: 10.762622,
    lng: 106.660172,
  });

  const A = L.latLng(10.762622, 106.660172);
  const B = L.latLng(10.7769, 106.7009);

  const polylineAtoCarRef = useRef<L.Polyline | null>(null);
  const polylineCarToBRef = useRef<L.Polyline | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // 🔹 Hàm gọi OSRM API để lấy route
  const fetchRoute = async (from: L.LatLng, to: L.LatLng): Promise<L.LatLng[]> => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
      const response = await fetch(url);
      const data: RouteResponse = await response.json();

      if (data.routes && data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates;
        // OSRM trả về [lng, lat], cần đổi thành [lat, lng] cho Leaflet
        return coords.map(([lng, lat]) => L.latLng(lat, lng));
      }
    } catch (error) {
      console.warn('Error fetching route:', error);
    }
    // Fallback: trả về đường thẳng nếu API lỗi
    return [from, to];
  };

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

  // 🔹 Tạo/cập nhật marker xe
  useEffect(() => {
    if (!map) return;

    if (!markerRef.current) {
      markerRef.current = L.marker(vehiclePos).addTo(map);
    } else {
      markerRef.current.setLatLng(vehiclePos);
    }

    // Cleanup marker khi unmount
    return () => {
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
        markerRef.current = null;
      }
    };
  }, [vehiclePos, map]);

  // 🔹 Vẽ polyline A -> xe và xe -> B (theo đường phố)
  useEffect(() => {
    if (!map) return;

    let isCancelled = false; // Flag để hủy async operations

    const updateRoutes = async () => {
      // Xóa polyline cũ
      if (polylineAtoCarRef.current) {
        try {
          map.removeLayer(polylineAtoCarRef.current);
        } catch (err) {
          console.warn('Error removing polyline A->Car:', err);
        }
        polylineAtoCarRef.current = null;
      }
      if (polylineCarToBRef.current) {
        try {
          map.removeLayer(polylineCarToBRef.current);
        } catch (err) {
          console.warn('Error removing polyline Car->B:', err);
        }
        polylineCarToBRef.current = null;
      }

      // Lấy route A -> xe từ OSRM
      const routeAToCar = await fetchRoute(A, L.latLng(vehiclePos.lat, vehiclePos.lng));

      // Kiểm tra nếu component đã unmount thì dừng
      if (isCancelled) return;

      try {
        polylineAtoCarRef.current = L.polyline(routeAToCar, {
          color: 'gray',
          weight: 5,
          opacity: 0.7,
          dashArray: '6, 6',
        }).addTo(map);
      } catch (err) {
        console.warn('Error adding polyline A->Car:', err);
      }

      // Lấy route xe -> B từ OSRM
      const routeCarToB = await fetchRoute(L.latLng(vehiclePos.lat, vehiclePos.lng), B);

      // Kiểm tra lại nếu component đã unmount
      if (isCancelled) return;

      try {
        polylineCarToBRef.current = L.polyline(routeCarToB, {
          color: 'blue',
          weight: 5,
          opacity: 0.9,
        }).addTo(map);
      } catch (err) {
        console.warn('Error adding polyline Car->B:', err);
      }
    };

    updateRoutes();

    // Cleanup khi unmount hoặc vehiclePos thay đổi
    return () => {
      isCancelled = true; // Đánh dấu để hủy async operations

      if (polylineAtoCarRef.current) {
        try {
          map.removeLayer(polylineAtoCarRef.current);
        } catch (err) {
          console.warn('Error cleaning up polyline A->Car:', err);
        }
        polylineAtoCarRef.current = null;
      }
      if (polylineCarToBRef.current) {
        try {
          map.removeLayer(polylineCarToBRef.current);
        } catch (err) {
          console.warn('Error cleaning up polyline Car->B:', err);
        }
        polylineCarToBRef.current = null;
      }
    };
  }, [vehiclePos, map, A, B]);

  return null;
}
