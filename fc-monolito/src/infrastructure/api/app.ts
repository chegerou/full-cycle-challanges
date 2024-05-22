import Express from "express";
import Cors from "cors";

export default class App {
  public server: Express.Application;
  private routes: Routes;

  constructor() {
    this.server = Express();
    this.routes = new Routes();

    this.middleware();
  }

  private middleware(): void {
    this.server.use(Express.json());
    this.server.use(Cors())
  }

  private routes() {
    this.server.use(this.routes.init());
  }

  public async run(): Promise<void> {
    
    this.routes();
  }

}
