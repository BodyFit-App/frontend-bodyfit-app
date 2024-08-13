type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};

export type QueryFn<T> = (...args: any[]) => Promise<ApiResponse<T>>;
