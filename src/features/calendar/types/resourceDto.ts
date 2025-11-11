/**
 * DTO Types for Resource API (Routes, Drivers, Buses)
 * Định nghĩa các kiểu dữ liệu Data Transfer Object cho Resources
 */

// ==================== Route DTOs ====================

/**
 * DTO cơ bản cho route (tuyến đường)
 */
export interface RouteDto {
  /** ID của tuyến đường */
  id: number;
  /** Tên tuyến đường */
  routerName: string;
  /** Route code (optional) */
  code?: string;
  /** Trạng thái */
  status?: 'active' | 'inactive';
}

/**
 * DTO chi tiết cho route
 */
export interface RouteDetailDto extends RouteDto {
  /** Điểm bắt đầu */
  startLocation: string;
  /** Điểm kết thúc */
  endLocation: string;
  /** Khoảng cách (km) */
  distance: number;
  /** Thời gian ước tính (phút) */
  estimatedDuration: number;
  /** Giá vé */
  fare: number;
  /** Mô tả tuyến đường */
  description?: string;
  /** Danh sách điểm dừng */
  stops?: RouteStopDto[];
  /** Thời gian tạo */
  createdAt?: string;
  /** Thời gian cập nhật */
  updatedAt?: string;
}

/**
 * DTO cho điểm dừng trên tuyến
 */
export interface RouteStopDto {
  /** ID của điểm dừng */
  id: number;
  /** Tên điểm dừng */
  name: string;
  /** Thứ tự điểm dừng */
  order: number;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Thời gian dừng ước tính (phút) */
  estimatedStopTime?: number;
}

/**
 * DTO cho request tạo route
 */
export interface CreateRouteDto {
  /** Tên tuyến đường */
  routerName: string;
  /** Route code */
  code?: string;
  /** Điểm bắt đầu */
  startLocation: string;
  /** Điểm kết thúc */
  endLocation: string;
  /** Khoảng cách (km) */
  distance: number;
  /** Thời gian ước tính (phút) */
  estimatedDuration: number;
  /** Giá vé */
  fare: number;
  /** Mô tả */
  description?: string;
}

// ==================== Driver DTOs ====================

/**
 * DTO cơ bản cho driver (tài xế)
 */
export interface DriverDto {
  /** ID của tài xế */
  id: number;
  /** Tên tài xế */
  name: string;
  /** Trạng thái */
  status?: 'active' | 'on_leave' | 'inactive';
}

/**
 * DTO chi tiết cho driver
 */
export interface DriverDetailDto extends DriverDto {
  /** Số điện thoại */
  phone: string;
  /** Email */
  email?: string;
  /** Ngày sinh */
  dateOfBirth?: string;
  /** Địa chỉ */
  address?: string;
  /** Số giấy phép lái xe */
  licenseNumber: string;
  /** Loại giấy phép */
  licenseType?: string;
  /** Ngày cấp giấy phép */
  licenseIssueDate?: string;
  /** Ngày hết hạn giấy phép */
  licenseExpiry: string;
  /** Số năm kinh nghiệm */
  experienceYears?: number;
  /** Ngày vào làm */
  hireDate?: string;
  /** Avatar URL */
  avatarUrl?: string;
  /** Thời gian tạo */
  createdAt?: string;
  /** Thời gian cập nhật */
  updatedAt?: string;
}

/**
 * DTO cho request tạo driver
 */
export interface CreateDriverDto {
  /** Tên tài xế */
  name: string;
  /** Số điện thoại */
  phone: string;
  /** Email */
  email?: string;
  /** Ngày sinh */
  dateOfBirth?: string;
  /** Địa chỉ */
  address?: string;
  /** Số giấy phép lái xe */
  licenseNumber: string;
  /** Loại giấy phép */
  licenseType?: string;
  /** Ngày hết hạn giấy phép */
  licenseExpiry: string;
  /** Ngày vào làm */
  hireDate?: string;
}

/**
 * DTO cho thống kê driver
 */
export interface DriverStatsDto {
  /** ID của driver */
  driverId: number;
  /** Tổng số chuyến đã chạy */
  totalTrips: number;
  /** Tổng số giờ lái xe */
  totalHours: number;
  /** Tổng quãng đường đã đi (km) */
  totalDistance: number;
  /** Số chuyến đúng giờ */
  onTimeTrips: number;
  /** Số chuyến trễ */
  lateTrips: number;
  /** Đánh giá trung bình */
  averageRating?: number;
}

// ==================== Bus DTOs ====================

/**
 * DTO cơ bản cho bus (xe bus)
 */
export interface BusDto {
  /** ID của xe bus */
  id: number;
  /** Số xe / Biển số */
  busNumber: string;
  /** Trạng thái */
  status?: 'active' | 'maintenance' | 'inactive';
}

/**
 * DTO chi tiết cho bus
 */
export interface BusDetailDto extends BusDto {
  /** Biển số xe đầy đủ */
  licensePlate: string;
  /** Model xe */
  model: string;
  /** Hãng xe */
  manufacturer?: string;
  /** Năm sản xuất */
  year: number;
  /** Sức chứa (số ghế) */
  capacity: number;
  /** Màu xe */
  color?: string;
  /** Loại xe (standard, luxury, electric) */
  type?: 'standard' | 'luxury' | 'electric';
  /** Số khung */
  chassisNumber?: string;
  /** Số máy */
  engineNumber?: string;
  /** Ngày đăng ký */
  registrationDate?: string;
  /** Ngày hết hạn đăng kiểm */
  inspectionExpiry?: string;
  /** Ngày bảo dưỡng gần nhất */
  lastMaintenanceDate?: string;
  /** Ngày bảo dưỡng tiếp theo */
  nextMaintenanceDate?: string;
  /** Số km đã đi */
  mileage?: number;
  /** Hình ảnh xe */
  imageUrl?: string;
  /** Thời gian tạo */
  createdAt?: string;
  /** Thời gian cập nhật */
  updatedAt?: string;
}

/**
 * DTO cho request tạo bus
 */
export interface CreateBusDto {
  /** Số xe / Biển số */
  busNumber: string;
  /** Biển số xe đầy đủ */
  licensePlate: string;
  /** Model xe */
  model: string;
  /** Hãng xe */
  manufacturer?: string;
  /** Năm sản xuất */
  year: number;
  /** Sức chứa */
  capacity: number;
  /** Màu xe */
  color?: string;
  /** Loại xe */
  type?: 'standard' | 'luxury' | 'electric';
  /** Số khung */
  chassisNumber?: string;
  /** Số máy */
  engineNumber?: string;
  /** Ngày đăng ký */
  registrationDate?: string;
}

/**
 * DTO cho thống kê bus
 */
export interface BusStatsDto {
  /** ID của bus */
  busId: number;
  /** Tổng số chuyến */
  totalTrips: number;
  /** Tổng số giờ hoạt động */
  totalHours: number;
  /** Tổng quãng đường (km) */
  totalDistance: number;
  /** Số lần bảo dưỡng */
  maintenanceCount: number;
  /** Chi phí bảo dưỡng */
  maintenanceCost?: number;
  /** Mức tiêu thụ nhiên liệu trung bình (l/100km) */
  averageFuelConsumption?: number;
}

// ==================== Normalized Resource DTO ====================

/**
 * DTO chuẩn hóa cho resource (dùng trong UI)
 * Backend có thể trả về nhiều format khác nhau, normalize về format thống nhất
 */
export interface NormalizedResourceDto {
  /** ID của resource */
  id: number;
  /** Title/Name hiển thị */
  title: string;
  /** Trạng thái (optional) */
  status?: string;
  /** Type của resource (route, driver, bus) */
  type?: 'route' | 'driver' | 'bus';
}

// ==================== Resource List DTOs ====================

/**
 * DTO cho danh sách routes
 */
export interface RouteListDto {
  items: RouteDto[];
  total: number;
}

/**
 * DTO cho danh sách drivers
 */
export interface DriverListDto {
  items: DriverDto[];
  total: number;
}

/**
 * DTO cho danh sách buses
 */
export interface BusListDto {
  items: BusDto[];
  total: number;
}

/**
 * DTO tổng hợp cho tất cả resources
 */
export interface AllResourcesDto {
  routes: RouteDto[];
  drivers: DriverDto[];
  buses: BusDto[];
}

// ==================== Filter DTOs ====================

/**
 * DTO cho filter resources
 */
export interface ResourceFilterDto {
  /** Search keyword */
  search?: string;
  /** Lọc theo trạng thái */
  status?: 'active' | 'inactive' | 'maintenance' | 'on_leave';
  /** Số items mỗi trang */
  pageSize?: number;
  /** Trang hiện tại */
  page?: number;
  /** Sắp xếp theo field */
  sortBy?: string;
  /** Thứ tự sắp xếp */
  sortOrder?: 'asc' | 'desc';
}

// ==================== Type Guards ====================

/**
 * Type guard để check xem resource có phải là route không
 */
export function isRouteDto(resource: unknown): resource is RouteDto {
  return typeof resource === 'object' && resource !== null && 'routerName' in resource;
}

/**
 * Type guard để check xem resource có phải là driver không
 */
export function isDriverDto(resource: unknown): resource is DriverDto {
  return (
    typeof resource === 'object' &&
    resource !== null &&
    'name' in resource &&
    !('busNumber' in resource) &&
    !('routerName' in resource)
  );
}

/**
 * Type guard để check xem resource có phải là bus không
 */
export function isBusDto(resource: unknown): resource is BusDto {
  return typeof resource === 'object' && resource !== null && 'busNumber' in resource;
}
