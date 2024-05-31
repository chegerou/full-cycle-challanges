import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import ClientModel from "../../../../modules/client-adm/repository/client.model";
import { AddClientFacadeInputDto } from "../../../../modules/client-adm/facade/client-adm.facade.interface";
import ClientAdmRouter from "../router/client-adm.router";

describe("ClientAdmController", () => {
  const app: Express = express();
  app.use(express.json());
  app.use(new ClientAdmRouter().init());

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    if (!sequelize) return;
    await sequelize.close();
  });

  it("shold be create a client", async () => {
    const data = {
        id: "1",
        name: "John Doe",
        email: "johndoe@example.com",
        document: "459.537.710-02",
        street: "Rua Júlio da Silva Barbosa",
        number: "123",
        complement: "Bairro: São Cristóvão",
        city: "Vitória",
        state: "ES",
        zipCode: "29048-530",
    } as AddClientFacadeInputDto;

    const response = await request(app)
      .post("/api/clients")
      .send(data);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("Client Created...");
  });
});
