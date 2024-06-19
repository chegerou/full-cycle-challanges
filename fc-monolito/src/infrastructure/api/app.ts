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
    console.log("Iniciando API..."); 
    await this.database.connect();
    console.log("Sucesso ao conectar com o banco..");
    this.routes();
    this.server.listen(3000, () => console.log("API está rodando na porta 3000..."));
  }
}
