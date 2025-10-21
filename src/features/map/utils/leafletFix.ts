import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

export const DefaultIcon = L.icon({
  iconUrl: iconUrl as unknown as string,
  iconRetinaUrl: iconRetinaUrl as unknown as string,
  shadowUrl: shadowUrl as unknown as string,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
