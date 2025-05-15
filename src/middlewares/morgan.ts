import morgan from "morgan";
import fs from "fs";
import path from "path";

class Morgan {
  private logDir: string;
  private accessLogStream: fs.WriteStream;
  private format: string;

  constructor() {
    this.logDir = path.resolve(__dirname, "../../logs");

    // Ensure logs directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    // Create write stream for access.log
    this.accessLogStream = fs.createWriteStream(
      path.join(this.logDir, "access.log"),
      { flags: "a" },
    );

    // Define Morgan format string
    this.format =
      ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] bytes - :response-time ms';
  }

  public getMiddleware() {
    // Combined stream: write to both access.log and console
    const combinedStream = {
      write: (message: string) => {
        this.accessLogStream.write(message);
        process.stdout.write(message);
      },
    };

    return morgan(this.format, { stream: combinedStream });
  }
}

const MorganMiddleware = new Morgan();

export default MorganMiddleware;
