// Purpose: Custom error class to handle error messages and status codes.
export default class CustomError extends Error {
  status: number;
  message: string;
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
