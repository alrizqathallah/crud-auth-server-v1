import helmet, { HelmetOptions } from "helmet";
import { RequestHandler } from "express";

class Helmet {
  private options: HelmetOptions;

  constructor() {
    this.options = {
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    };
  }

  public getMiddleware(): RequestHandler {
    return helmet(this.options);
  }
}

const HelmetMiddleware = new Helmet();

export default HelmetMiddleware;
