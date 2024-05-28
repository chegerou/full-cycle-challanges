import { Request, Response } from "express";

export default interface ProductControllerInterface {
  create(req: Request, res: Response): Promise<Response>;
  checkStock(req: Request, res: Response): Promise<Response>;
}
