import Express from "express";
import Cors from "cors";
import Routes from "./routes";
import Database from "./config/database";

export default class App {
  public server: Express.Application;
  private router: Routes;
  private database: Database;

  constructor(router: Routes, database: Database) {
    this.server = Express();
    this.router = router;
    this.database = database;

    this.middleware();
  }

  private middleware(): void {
    this.server.use(Express.json());
    this.server.use(Cors());
  }

  private routes() {
    this.server.use(this.router.init());
  }

  public async run(): Promise<void> {
    console.log("App run method called..."); 
    await this.database.connect();
    console.log("Successfully connected to database...");
    this.routes();
    this.server.listen(3000, () => console.log("Api running on port 3000"));
  }
}
