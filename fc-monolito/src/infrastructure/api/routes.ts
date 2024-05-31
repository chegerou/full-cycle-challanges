import { Router } from "express";
import ProductRouter from "./product/routes/product.router";
import ClientAdmRouter from "./client-adm/router/client-adm.router";
import CheckoutRouter from "./checkout/router/checkout.router";

export default class Routes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public init(): Router {
    this.router.use(new ProductRouter().init());
    this.router.use(new ClientAdmRouter().init());
    this.router.use(new CheckoutRouter().init());
    return this.router;
  }
}
