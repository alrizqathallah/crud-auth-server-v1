import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import config from "../configs/env.config";
import ILogger from "../interfaces/logger.interface"; // <- Import interface

const logDir = path.resolve(__dirname, "../../logs");

if (!fs.existsSync(logDir)) {
  try {
    fs.mkdirSync(logDir, { recursive: true });
    console.log("Created log directory");
  } catch (error) {
    console.error("Failed to create log directory:", error);
  }
}

// Formatters...
const filterOnlyLevels = (levels: string[]) =>
  format((info) => (levels.includes(info.level) ? info : false))();

const fileLogFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
  }),
);

const consoleLogFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    const color =
      {
        error: chalk.redBright,
        warn: chalk.yellowBright,
        info: chalk.blueBright,
        http: chalk.greenBright,
        debug: chalk.magentaBright,
      }[level] || ((msg: string) => msg);
    return `${chalk.gray(timestamp)} [${color(level.toUpperCase())}] ${message}`;
  }),
);

class Logger implements ILogger {
  private logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      level: config.NODE_ENV === "production" ? "info" : "debug",
      transports: [
        new transports.Console({ format: consoleLogFormat }),

        new DailyRotateFile({
          dirname: logDir,
          filename: "app-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
          level: "info",
          format: format.combine(
            filterOnlyLevels(["info", "warn", "http"]),
            fileLogFormat,
          ),
        }),

        new transports.File({
          filename: path.join(logDir, "error.log"),
          level: "error",
          format: format.combine(filterOnlyLevels(["error"]), fileLogFormat),
        }),

        new transports.File({
          filename: path.join(logDir, "access.log"),
          level: "http",
          format: format.combine(filterOnlyLevels(["http"]), fileLogFormat),
        }),

        new transports.File({
          filename: path.join(logDir, "debug.log"),
          level: "debug",
          format: format.combine(filterOnlyLevels(["debug"]), fileLogFormat),
        }),

        new transports.File({
          filename: path.join(logDir, "combined.log"),
          level: "info",
          format: format.combine(
            filterOnlyLevels(["info", "warn"]),
            fileLogFormat,
          ),
        }),
      ],
    });
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public http(message: string): void {
    this.logger.http(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }
}

export default new Logger();
