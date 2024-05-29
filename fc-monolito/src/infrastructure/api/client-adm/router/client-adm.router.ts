import { Router } from "express";
import IRoutes from "../../@shared/routes.interface";
import ClientAdmController from "../controller/client-adm.controller";

export default class ClientAdmRouter implements IRoutes {
  public router: Router;
  public clientAdmController: ClientAdmController;

  constructor() {
    this.router = Router();
    this.clientAdmController = new ClientAdmController();
  }

  init(): Router {
    this.router.post("/api/clients", (req, res) =>
      this.clientAdmController.create(req, res)
    );
    return this.router;
  }
}
