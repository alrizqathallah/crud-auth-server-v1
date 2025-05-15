import compression from "compression";
import { RequestHandler } from "express";

class Compression {
  public getMiddleware(): RequestHandler {
    return compression();
  }
}

const CompressionMiddleware = new Compression();

export default CompressionMiddleware;
