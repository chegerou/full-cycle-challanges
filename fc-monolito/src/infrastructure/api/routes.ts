import { Router } from "express";
import ProductRouter from "./product/routes/product.router";

export default class Routes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public init(): Router {
    this.router.use(new ProductRouter().init());
    return this.router;
  }
}
