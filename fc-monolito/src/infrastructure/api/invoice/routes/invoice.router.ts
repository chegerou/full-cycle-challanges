import { Router } from "express";
import IRoutes from "../../@shared/routes.interface";
import InvoiceController from "../controller/invoice.controller";

export default class InvoiceRouter implements IRoutes {
  public router: Router;
  private invoiceController: InvoiceController;

  constructor() {
    this.router = Router();
    this.invoiceController = new InvoiceController();
  }

  public init(): Router {
    this.router.get("/api/invoice/:id", (req, res) =>
      this.invoiceController.findById(req, res)
    );
    return this.router;
  }
}
