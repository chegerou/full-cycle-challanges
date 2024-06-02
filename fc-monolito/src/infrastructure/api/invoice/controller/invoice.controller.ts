import InvoiceFacadeInterface, {
  InvoiceFacadeOutputDto,
} from "../../../../modules/invoice/facade/facade.interface";
import InvoiceFacadeFactory from "../../../../modules/invoice/factory/invoice.factory";
import { InvoiceControllerInterface } from "./invoice.interface";
import { Request, Response } from "express";

export default class InvoiceController implements InvoiceControllerInterface {
  private invoiceFacade: InvoiceFacadeInterface;

  constructor() {
    this.invoiceFacade = InvoiceFacadeFactory.create();
  }

  async findById(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const invoice = await this.invoiceFacade.find({ id });
    res.status(200).json(invoice);
  }
}
