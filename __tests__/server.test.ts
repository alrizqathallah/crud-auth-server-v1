import { describe, it, expect, vi } from "vitest";
import Server from "../src/server";
import config from "../src/configs/env.config"; // Import actual config

vi.mock(import("../src/configs/env.config"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    PORT: 6000,
    NODE_ENV: "development",
  };
});

// Mock only console.log to prevent test pollution
vi.spyOn(console, "log").mockImplementation(() => {});

describe("Server configuration", () => {
  it("should initialize with correct config environment", () => {
    const server = new Server();

    // Test against actual config values
    expect(server.port).toBe(config.PORT);
    expect(server.env).toBe(config.NODE_ENV);
  });

  it("should start the server instance", () => {
    const server = new Server();
    server.startInstance();

    expect(console.log).toBeCalledWith(
      `Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`,
    );
  });
});
