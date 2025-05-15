import express, { Application, Request, Response } from "express";

class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.initializeMiddlewares();
    this.intializeHealthChecks();
  }

  private initializeMiddlewares(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private intializeHealthChecks(): void {
    this.express.get("/health", (req: Request, _res: Response) => {
      _res.status(200).json({
        success: true,
        status: "OK",
        message: "Server is healthy",
      });
    });
  }
}

export default App;
