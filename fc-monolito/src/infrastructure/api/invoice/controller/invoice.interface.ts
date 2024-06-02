import { InvoiceFacadeOutputDto } from "../../../../modules/invoice/facade/facade.interface";
import { Request, Response } from "express";

export interface InvoiceControllerInterface {
  findById(
    req: Request,
    res: Response
  ): Promise<void>;
}
