import type * as L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface Control extends L.Control {
      on(arg0: string, arg1: (e: any) => void): unknown;
      getRouter(): {
        _requests: { abort?: () => void }[];
      };
    }

    interface ControlOptions extends L.ControlOptions {
      waypoints?: L.LatLng[];
      lineOptions?: Record<string, unknown>;
      addWaypoints?: boolean;
      routeWhileDragging?: boolean;
      showAlternatives?: boolean;
      draggableWaypoints?: boolean;
      fitSelectedRoutes?: boolean;
      show?: boolean;
      createMarker?: (i: number, wp: L.Routing.Waypoint, nWps: number) => L.Marker | null;
    }

    function control(options?: ControlOptions): Control;
  }
}
