import App from "./app";
import config from "./configs/env.config";

class Server {
  public server: App;
  public port = config.PORT;
  public env = config.NODE_ENV;

  constructor() {
    this.server = new App();
  }

  public startInstance(): void {
    this.server.express.listen(this.port, () => {
      console.log(`Server is running on port ${this.port} in ${this.env} mode`);
    });
  }
}

const server = new Server();

server.startInstance();

export default Server;
