export interface ApiResponse<T> {
  statuscode: number;
  data: T;
  message: string;
  success: boolean;
}
