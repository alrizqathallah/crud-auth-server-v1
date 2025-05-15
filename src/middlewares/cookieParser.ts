import cookieParser from "cookie-parser";
import { RequestHandler } from "express";

class CookieParser {
  public getMiddleware(): RequestHandler {
    return cookieParser();
  }
}

const CookieParserMiddleware = new CookieParser();

export default CookieParserMiddleware;
