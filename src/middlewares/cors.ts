import cors, { CorsOptions } from "cors";
import { RequestHandler } from "express";

class Cors {
  private options: CorsOptions;

  constructor() {
    this.options = {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
  }

  public getMiddleware(): RequestHandler {
    return cors(this.options);
  }
}

const CorsMiddleware = new Cors();

export default CorsMiddleware;
