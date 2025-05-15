import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

class RateLimiter {
  private limiter: RateLimitRequestHandler;

  constructor() {
    this.limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: "Too many request, please try again later.",
    });
  }

  public getMiddleware(): RateLimitRequestHandler {
    return this.limiter;
  }
}

const RateLimiterMiddleware = new RateLimiter();

export default RateLimiterMiddleware;
