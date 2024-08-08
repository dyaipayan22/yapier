class ApiResponse<T> {
  statusCode: number;
  payload: T;
  message: string;
  success: boolean;

  constructor(statusCode: number, payload: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.payload = payload;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
