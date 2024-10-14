class ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;

  constructor(
    statusCode: number,
    data: any,
    message = "This is a success response"
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
