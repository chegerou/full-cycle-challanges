import { Request, Response } from "express";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
} from "../../../../modules/client-adm/facade/client-adm.facade.interface";
import ClientAdmFacadeFactory from "../../../../modules/client-adm/factory/client-adm.facade.factory";
import ClientAdmControllerInterface from "./client-adm.interface";

export default class ClientAdmController
  implements ClientAdmControllerInterface
{
  private readonly clientAdmFacade: ClientAdmFacadeInterface;
  constructor() {
    this.clientAdmFacade = ClientAdmFacadeFactory.create();
  }
  async create(req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      res.status(400).send("Request body is empty.");
    }

    const {
      name,
      email,
      document,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
    } = req.body;
    const addClientFacadeInput: AddClientFacadeInputDto = {
      name,
      email,
      document,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
    };

    await this.clientAdmFacade.add(addClientFacadeInput);
    return res.status(201).json({ status: "Client Created..." });
  }
}
