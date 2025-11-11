import axios, { type AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { toast } from 'sonner';

type StatusHandlersType = Record<number | 'default', (msg?: string) => void>;

const statusHandlers: StatusHandlersType = {
  400: (msg?: string) => toast.error(msg ?? 'Yêu cầu không hợp lệ.'),
  401: (msg?: string) => toast.error(msg ?? 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'),
  403: (msg?: string) => toast.error(msg ?? 'Bạn không có quyền truy cập chức năng này.'),
  404: (msg?: string) => toast.error(msg ?? 'Không tìm thấy tài nguyên yêu cầu.'),
  500: (msg?: string) => toast.error(msg ?? 'Lỗi máy chủ. Vui lòng thử lại sau.'),
  503: (msg?: string) => toast.error(msg ?? 'Dịch vụ tạm thời không khả dụng.'),
  default: (msg?: string) => toast.error(msg ?? 'Đã xảy ra lỗi không xác định.'),
};

export const handleAxiosError = (error: unknown): unknown => {
  console.error('❌ API Error:', error);

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const httpStatus = axiosError.response.status;
      const errorResponse = axiosError.response.data as any;

      const httpMessage =
        errorResponse?.data?.message ||
        errorResponse?.message ||
        axiosError.message || 
        undefined;

      if (httpStatus === 401) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('userData');

        toast.error('Phiên đăng nhập hết hạn. Đang chuyển về trang đăng nhập...');

        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1500);

        return;
      }

      const handler = statusHandlers[httpStatus] ?? statusHandlers.default;
      handler(httpMessage);
    }
    else if (axiosError.request) {
      toast.error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
    }
    else {
      toast.error('Lỗi cấu hình yêu cầu. Vui lòng liên hệ quản trị viên.');
    }
  }
  else if (error instanceof Error) {
    toast.error(error.message || 'Đã xảy ra lỗi không xác định.');
  }
  else {
    toast.error('Lỗi không xác định. Vui lòng thử lại.');
  }

  return error;
};

export default handleAxiosError;