import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../src/app";

describe("App", () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });

  describe("Initialization", () => {
    it("should create an express application", () => {
      expect(app.express).toBeDefined();
      expect(typeof app.express.use).toBe("function");
    });

    it("Initialize Middlewares", () => {
      expect(typeof app.express.use).toBe("function");
      expect(typeof app.express.use).toBe("function");
    });
  });

  describe("GET /health", () => {
    it("should GET /health endpoint", async () => {
      const response = await request(app.express).get("/health");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        status: "OK",
        message: "Server is healthy",
      });
    });
  });
});
