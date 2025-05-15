import express, { Application, Request, Response } from "express";
import MorganMiddleware from "./middlewares/morgan";
import CorsMiddleware from "./middlewares/cors";
import CookieParserMiddleware from "./middlewares/cookieParser";
import HelmetMiddleware from "./middlewares/helmet";
import CompressionMiddleware from "./middlewares/compression";
import RateLimiterMiddleware from "./middlewares/rateLimiter";
class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.initializeMiddlewares();
    this.intializeHealthChecks();
  }

  private initializeMiddlewares(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(CorsMiddleware.getMiddleware());
    this.express.use(CookieParserMiddleware.getMiddleware());
    this.express.use(HelmetMiddleware.getMiddleware());
    this.express.use(CompressionMiddleware.getMiddleware());
    this.express.use(RateLimiterMiddleware.getMiddleware());
    this.express.use(MorganMiddleware.getMiddleware());
  }

  private intializeHealthChecks(): void {
    this.express.get("/health", (req: Request, _res: Response) => {
      _res.status(200).json({
        success: true,
        status: "OK",
        message: "Server is healthy",
      });
    });
  }
}

export default App;
