export interface IError extends Error {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;
  stack?: string;
}
