import { AppError } from "./app.error";

export class ConfigurationError extends AppError {
  constructor(message = "Configuration Error") {
    super(message, 500);
  }
}

export class ThirdPartyServiceError extends AppError {
  constructor(message = "Third Party Service Error") {
    super(message, 502);
  }
}
