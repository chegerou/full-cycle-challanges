import { Router } from "express";
import ProductController from "../controller/product.controller";

export default class ProductRouter {
  public router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
  }

  init(): Router {
    this.router.post("/api/products/check-stock", (req, res) => this.productController.checkStock(req, res));
    this.router.post("/api/products/register", (req, res) => this.productController.create(req, res));
    return this.router;
  }
}
