import type * as L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface ControlOptions {
      waypoints?: L.LatLng[];
      lineOptions?: Record<string, unknown>;
      show?: boolean;
      addWaypoints?: boolean;
      routeWhileDragging?: boolean;
      draggableWaypoints?: boolean;
      fitSelectedRoutes?: boolean;
      createMarker?: (i: number, wp: L.Routing.Waypoint, nWps: number) => L.Marker | null;
    }

    interface WaypointOptions {
      name?: string;
      options?: Record<string, unknown>;
    }

    function control(options?: ControlOptions): L.Control;
    function waypoint(latLng: L.LatLng, name?: string, options?: WaypointOptions): L.Routing.Waypoint;
  }
}
