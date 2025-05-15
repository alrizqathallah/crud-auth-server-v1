import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html", "json"],
      include: ["src/**/*.ts"],
      exclude: ["**/__tests__/**/*", "**/*.test.ts"],
    },
    // setupFiles: ["./__tests__/setup.ts"],
    exclude: ["node_modules", "dist", ".git", ".vscode", ".cache"],
  },
});
