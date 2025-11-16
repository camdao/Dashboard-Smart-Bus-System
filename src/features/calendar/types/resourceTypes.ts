export type ApiResponse<T> = {
  status: string;
  message: string;
  timestamp: string;
  data: T;
};

export type Route = {
  id: number;
  routerName: string;
};

export type RouteDTO = ApiResponse<Route[]>;

export type Driver = {
  id: number;
  username: string;
  role?: string;
};

export type Bus = {
  id: number;
  licensePlate: string;
  model?: string;
  capacity?: number;
  status?: string;
};
