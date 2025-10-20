'use client';

import dynamic from 'next/dynamic';

const MapFeatures = dynamic(() => import('@/features/map/ui/MapFeatures'), {
  ssr: false,
});

export default function Page() {
  return <MapFeatures />;
}
