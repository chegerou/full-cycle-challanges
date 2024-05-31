import { Router } from "express";
import IRoutes from "../../@shared/routes.interface";
import CheckoutController from "../controller/checkout.controller";


export default class CheckoutRouter implements IRoutes {
  public router: Router;
  public checkoutController: CheckoutController;

  constructor() {
    this.router = Router();
    this.checkoutController = new CheckoutController();
  }

  init(): Router {
    this.router.post("/api/checkout", (req, res) =>
      this.checkoutController.create(req, res)
    );
    return this.router;
  }
}
