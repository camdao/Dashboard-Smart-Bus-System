export type Route = {
  id: number;
  routerName: string;
};

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
