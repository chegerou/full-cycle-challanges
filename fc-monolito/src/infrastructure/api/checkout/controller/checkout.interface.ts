import { Request, Response } from "express";

export interface CheckoutControllerInterface {
  create(req: Request, res: Response): Promise<void>;
}
