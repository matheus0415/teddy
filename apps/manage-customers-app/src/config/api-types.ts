export interface HttpResponse<T = unknown> {
  status: number;
  data: T;
  success: boolean;
  message?: string;
}
