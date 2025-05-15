import { IError } from "../interfaces/error.interface";

export abstract class AppError extends Error implements IError {
  public statusCode: number;
  public status: "fail" | "error";
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
