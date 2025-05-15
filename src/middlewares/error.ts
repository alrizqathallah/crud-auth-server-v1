import { Request, Response, NextFunction } from "express";
import { IError } from "../interfaces/error.interface";
import logger from "../utils/logger";
import { NotFoundError } from "../errors/response.error";

export class ErrorHandler {
  private static isTrustedError(error: IError): boolean {
    return error.isOperational;
  }

  public static handle(
    err: Error | IError,
    req: Request,
    res: Response,
    // next: NextFunction,
  ): void {
    const error = this.normalizeError(err);

    if (process.env.NODE_ENV === "development") {
      this.sendErrorDev(error, res);
    } else {
      this.sendErrorProd(error, res);
    }
  }

  private static normalizeError(err: Error | IError): IError {
    if ("statusCode" in err) {
      return err;
    }

    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      statusCode: 500,
      status: "error",
      isOperational: false,
    };
  }

  private static sendErrorDev(err: IError, res: Response): void {
    res.status(err.statusCode).json({
      status: err.status,
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }

  private static sendErrorProd(err: IError, res: Response): void {
    if (this.isTrustedError(err)) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      logger.error("UNHANDLED ERROR:", err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }

  public static catchAsync(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  }

  public static notFound(req: Request, res: Response, next: NextFunction) {
    next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
  }
}
