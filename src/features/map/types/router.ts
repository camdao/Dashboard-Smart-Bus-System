export interface Bus {
  id: number;
  licensePlate: string;
  model: string;
  capacity: number;
  status: string;
  location: string | null;
}

export interface Router {
  id: number;
  name: string;
  startLocation: string;
  endLocation: string;
  distance: number;
}

export interface AllRouter {
  bus: Bus;
  router: Router;
}
