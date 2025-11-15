export type ApiResponse<T> = {
  status: string;
  message: string;
  timestamp: string;
  data: T;
};

export type ScheduleRequest = {
  busId: number;
  driverId: number;
  routerId: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
};

export type ScheduleResponse = {
  scheduleId: number;
  busId: number;
  driverId: number;
  routerId: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
};

export type ScheduleDto = ApiResponse<ScheduleResponse>;

export type ScheduleDetailResponse = {
  scheduleId: number;
  bus: {
    id: number;
    licensePlate: string;
    model?: string;
    capacity?: number;
    status?: string;
  };
  router: {
    id: number;
    name: string;
    startLocation?: string;
    endLocation?: string;
    distance?: number;
  };
  driver?: {
    id: number;
    name?: string;
  } | null;
  scheduleDate: string;
  startTime: string;
  endTime: string;
};
export type ScheduleDetailResponseDTO = ApiResponse<ScheduleDetailResponse>;

export type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  description?: string;
  busId: number;
  driverId: number;
  routerId: number;
  startTime: string;
  endTime: string;
};
