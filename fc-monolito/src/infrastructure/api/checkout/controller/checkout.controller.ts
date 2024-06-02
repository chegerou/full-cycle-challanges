import UseCaseInterface from "../../../../modules/@shared/usecase/use-case.interface";
import CheckoutFactory from "../../../../modules/checkout/factory/checkout.factory";
import { PlaceOrderOutputDto } from "../../../../modules/checkout/usecase/place-order/place-order.dto";
import PlaceOrderUseCase from "../../../../modules/checkout/usecase/place-order/place-order.usecase";
import { CheckoutControllerInterface } from "./checkout.interface";
import { Request, Response } from "express";

export default class CheckoutController implements CheckoutControllerInterface {
  private placeOrderUseCase: UseCaseInterface;

  constructor() {
    this.placeOrderUseCase = CheckoutFactory.create();
  }

  async create(req: Request, res: Response): Promise<void> {
    const { clientId, products } = req.body;
    const output = await this.placeOrderUseCase.execute({
      clientId,
      products,
    });
    res.status(201).json(output);
  }
}
