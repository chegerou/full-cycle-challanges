import { Request, Response } from "express";
import ProductControllerInterface from "./product.controller.interface";
import ProductAdmFacadeInterface, {
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "../../../../modules/product-adm/facade/product-adm.facade.interface";
import ProductAdmFacadeFactory from "../../../../modules/product-adm/factory/facade.factory";

export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export default class ProductController implements ProductControllerInterface {
  private readonly productAdmFacade: ProductAdmFacadeInterface = ProductAdmFacadeFactory.create();

  constructor() {}

  async checkStock(req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      res.status(400).send("Request body is empty.");
    }

    const { productId } = req.body;

    const checkStockFacadeInput: CheckStockFacadeInputDto = {
      productId,
    };

    const checkStockFacadeOutput: CheckStockFacadeOutputDto =
      await this.productAdmFacade.checkStock(checkStockFacadeInput);

    return res.status(200).json(checkStockFacadeOutput);
  }

  async create(req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      res.status(400).send("Request body is empty.");
    }

    const { id, name, description, purchasePrice, stock } = req.body;

    const addProductFacadeInput: AddProductFacadeInputDto = {
      id,
      name,
      description,
      purchasePrice,
      stock,
    };

    await this.productAdmFacade.addProduct(addProductFacadeInput);

    return res.status(201).json({ status: "Product Created..." });
  }
}
