import dotenv from "dotenv";
import path from "path";

import IEnvironment from "../interfaces/env.interface";

class EnvConfig implements IEnvironment {
  public PORT: number;
  public NODE_ENV: string;
  public APP_ORIGIN: string;
  public BASE_PATH: string;

  constructor() {
    this.loadEnvFiles();
    this.PORT = Number(this.getEnvValues("PORT", "6001"));
    this.NODE_ENV = this.getEnvValues("NODE_ENV", "development");
    this.APP_ORIGIN = this.getEnvValues("APP_ORIGIN", "http://localhost:5173");
    this.BASE_PATH = this.getEnvValues("BASE_PATH", "/api/v1");
  }

  private loadEnvFiles(): void {
    const envFile =
      process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";

    dotenv.config({
      path: path.resolve(process.cwd(), envFile),
    });
  }

  private getEnvValues(key: string, defaultValue?: string): string {
    const value = process.env[key];

    if (!value && defaultValue === undefined) {
      throw new Error(`Missing required environment variables: ${key}`);
    }

    return value ?? defaultValue!;
  }
}

const config = new EnvConfig();

export default config;
