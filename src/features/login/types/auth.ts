export type ApiResponse<T> = {
  status: string;
  message: string;
  timestamp: string;
  data: T;
};

export type TokenDto = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponseDto = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type LoginPayloadDto = {
  username: string;
  password: string;
};

export type AuthDto = ApiResponse<AuthResponseDto>;
