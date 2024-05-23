import Express from "express";
import Cors from "cors";
import Routes from "./routes";

export default class App {
  public server: Express.Application;
  private router: Routes;

  constructor() {
    this.server = Express();
    this.router = new Routes();

    this.middleware();
  }

  private middleware(): void {
    this.server.use(Express.json());
    this.server.use(Cors())
  }

  private routes() {
    this.server.use(this.router.init());
  }

  public async run(): Promise<void> {
    this.routes();
    this.server.listen(3000, () => console.log("Api running on port 3000"));
  }

}
