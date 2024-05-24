import { Router } from "express";
import IRoutes from "../../@shared/routes.interface";
import ProductController from "../controller/product.controller";

export default class ProductRouter implements IRoutes {
  private controller: ProductController;
  constructor() {
    this.controller = new ProductController();
  }

  init(): Router {
    const router = Router();
    router.use("/api/products", router);
    router.post("/", this.controller.create);
    return router;
  }
}
