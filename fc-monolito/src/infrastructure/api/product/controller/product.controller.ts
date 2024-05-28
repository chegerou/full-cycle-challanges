import { Request, Response } from "express";
import ProductControllerInterface from "./product.controller.interface";
import ProductAdmFacadeInterface from "../../../../modules/product-adm/facade/product-adm.facade.interface";
import ProductAdmFacadeFactory from "../../../../modules/product-adm/factory/facade.factory";

export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export default class ProductController implements ProductControllerInterface {
  constructor() {}

  async create(req: Request, res: Response): Promise<Response> {
    const productAdmFacade: ProductAdmFacadeInterface =
    ProductAdmFacadeFactory.create();
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

    await productAdmFacade.addProduct(addProductFacadeInput);

    return res.status(201).send("Product Created...");
  }
}
