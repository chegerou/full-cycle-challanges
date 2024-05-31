import { PlaceOrderOutputDto } from "../../../../modules/checkout/usecase/place-order/place-order.dto";
import { Request, Response } from "express";

export interface CheckoutControllerInterface {
  create(req: Request, res: Response): Promise<PlaceOrderOutputDto>;
}
