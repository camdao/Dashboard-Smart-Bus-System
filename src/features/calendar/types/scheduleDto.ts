/**
 * DTO Types for Schedule API
 * Định nghĩa các kiểu dữ liệu Data Transfer Object cho Schedule
 */

// ==================== Base DTOs ====================

/**
 * DTO cho request tạo hoặc cập nhật schedule
 */
export interface CreateScheduleDto {
  /** ID của xe bus */
  busId: number;
  /** ID của tài xế */
  driverId: number;
  /** ID của tuyến đường */
  routerId: number;
  /** Ngày lên lịch (format: YYYY-MM-DD) */
  scheduleDate: string;
  /** Thời gian bắt đầu (format: HH:mm:ss hoặc HH:mm) */
  startTime: string;
  /** Thời gian kết thúc (format: HH:mm:ss hoặc HH:mm) */
  endTime: string;
}

/**
 * DTO cho response update schedule
 */
export interface UpdateScheduleDto extends CreateScheduleDto {
  /** ID của schedule cần update */
  scheduleId: number;
}

/**
 * DTO cơ bản cho schedule response từ API
 */
export interface ScheduleDto {
  /** ID của schedule */
  scheduleId: number;
  /** ID của xe bus */
  busId: number;
  /** ID của tài xế */
  driverId: number;
  /** ID của tuyến đường */
  routerId: number;
  /** Ngày lên lịch */
  scheduleDate: string;
  /** Thời gian bắt đầu */
  startTime: string;
  /** Thời gian kết thúc */
  endTime: string;
  /** Thời gian tạo (optional) */
  createdAt?: string;
  /** Thời gian cập nhật (optional) */
  updatedAt?: string;
}

// ==================== Nested Object DTOs ====================

/**
 * DTO cho thông tin xe bus trong schedule detail
 */
export interface BusDetailDto {
  /** ID của xe bus */
  id: number;
  /** Biển số xe */
  licensePlate: string;
  /** Model xe (optional) */
  model?: string;
  /** Sức chứa (optional) */
  capacity?: number;
  /** Trạng thái xe (active, maintenance, inactive) */
  status?: 'active' | 'maintenance' | 'inactive';
  /** Năm sản xuất (optional) */
  year?: number;
  /** Màu xe (optional) */
  color?: string;
}

/**
 * DTO cho thông tin tuyến đường trong schedule detail
 */
export interface RouteDetailDto {
  /** ID của tuyến đường */
  id: number;
  /** Tên tuyến đường */
  name: string;
  /** Điểm bắt đầu (optional) */
  startLocation?: string;
  /** Điểm kết thúc (optional) */
  endLocation?: string;
  /** Khoảng cách (km) */
  distance?: number;
  /** Thời gian ước tính (phút) */
  estimatedDuration?: number;
  /** Giá vé (optional) */
  fare?: number;
  /** Trạng thái tuyến (active, inactive) */
  status?: 'active' | 'inactive';
}

/**
 * DTO cho thông tin tài xế trong schedule detail
 */
export interface DriverDetailDto {
  /** ID của tài xế */
  id: number;
  /** Tên tài xế */
  name?: string;
  /** Số điện thoại (optional) */
  phone?: string;
  /** Email (optional) */
  email?: string;
  /** Số giấy phép lái xe (optional) */
  licenseNumber?: string;
  /** Ngày hết hạn giấy phép (optional) */
  licenseExpiry?: string;
  /** Trạng thái (active, on_leave, inactive) */
  status?: 'active' | 'on_leave' | 'inactive';
}

// ==================== Complex Response DTOs ====================

/**
 * DTO chi tiết cho schedule response (bao gồm nested objects)
 */
export interface ScheduleDetailDto {
  /** ID của schedule */
  scheduleId: number;
  /** Thông tin chi tiết xe bus */
  bus: BusDetailDto;
  /** Thông tin chi tiết tuyến đường */
  router: RouteDetailDto;
  /** Thông tin chi tiết tài xế (có thể null nếu chưa assign) */
  driver: DriverDetailDto | null;
  /** Ngày lên lịch */
  scheduleDate: string;
  /** Thời gian bắt đầu */
  startTime: string;
  /** Thời gian kết thúc */
  endTime: string;
  /** Trạng thái schedule (scheduled, completed, cancelled) */
  status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  /** Ghi chú (optional) */
  notes?: string;
  /** Thời gian tạo */
  createdAt?: string;
  /** Thời gian cập nhật */
  updatedAt?: string;
}

/**
 * DTO cho danh sách schedules với pagination
 */
export interface ScheduleListDto {
  /** Danh sách schedules */
  items: ScheduleDto[];
  /** Tổng số items */
  total: number;
  /** Trang hiện tại */
  page: number;
  /** Số items mỗi trang */
  pageSize: number;
  /** Tổng số trang */
  totalPages: number;
}

/**
 * DTO cho filter schedules
 */
export interface ScheduleFilterDto {
  /** Năm cần lọc */
  year?: number;
  /** Tháng cần lọc (1-12) */
  month?: number;
  /** Ngày cần lọc (1-31) */
  day?: number;
  /** Lọc theo bus ID */
  busId?: number;
  /** Lọc theo driver ID */
  driverId?: number;
  /** Lọc theo route ID */
  routerId?: number;
  /** Lọc theo trạng thái */
  status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  /** Ngày bắt đầu (range filter) */
  startDate?: string;
  /** Ngày kết thúc (range filter) */
  endDate?: string;
}

// ==================== Calendar Specific DTOs ====================

/**
 * DTO cho calendar event (dùng cho FullCalendar)
 */
export interface CalendarEventDto {
  /** ID của event */
  id: number;
  /** Title hiển thị trên calendar */
  title: string;
  /** Ngày của event */
  date: string;
  /** Mô tả (optional) */
  description?: string;
  /** ID của xe bus */
  busId: number;
  /** ID của tài xế */
  driverId: number;
  /** ID của tuyến đường */
  routerId: number;
  /** Thời gian bắt đầu */
  startTime: string;
  /** Thời gian kết thúc */
  endTime: string;
  /** Màu sắc event (optional) */
  backgroundColor?: string;
  /** Màu chữ (optional) */
  textColor?: string;
  /** Có thể kéo thả không */
  editable?: boolean;
}

// ==================== API Response Wrapper ====================

/**
 * Generic API Response wrapper
 */
export interface ApiResponse<T> {
  /** Trạng thái thành công */
  success: boolean;
  /** HTTP status code */
  status: number;
  /** Data trả về */
  data: T;
  /** Thông báo (optional) */
  message?: string;
  /** Timestamp của response */
  timestamp: string;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  /** Trạng thái thành công (luôn false) */
  success: false;
  /** HTTP status code */
  status: number;
  /** Error message */
  message: string;
  /** Chi tiết lỗi (optional) */
  errors?: Record<string, string[]>;
  /** Timestamp của response */
  timestamp: string;
}

// ==================== Type Guards ====================

/**
 * Type guard để check xem response có phải là error không
 */
export function isApiErrorResponse(response: unknown): response is ApiErrorResponse {
  return typeof response === 'object' && response !== null && 'success' in response && response.success === false;
}

/**
 * Type guard để check xem schedule có driver hay không
 */
export function hasDriver(schedule: ScheduleDetailDto): schedule is ScheduleDetailDto & { driver: DriverDetailDto } {
  return schedule.driver !== null && schedule.driver !== undefined;
}
