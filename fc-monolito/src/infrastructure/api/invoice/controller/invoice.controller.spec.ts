import express, { Express } from "express";
import InvoiceModel from "../../../../modules/invoice/repository/invoice.model";
import { Sequelize } from "sequelize-typescript";
import InvoiceRouter from "../routes/invoice.router";
import request from "supertest";

describe("InvoiceController", () => {
  const app: Express = express();
  app.use(express.json());
  app.use(new InvoiceRouter().init());

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    sequelize.addModels([InvoiceModel]);
    await sequelize.sync();

    await InvoiceModel.create({
      id: "1i",
      name: "Test Invoice 1",
      document: "Test Document 1",
      addressStreet: "Test Street Address 1",
      addressNumber: "Test Number Address 1",
      addressComplement: "Test Complement Address 1",
      addressCity: "Test City Address 1",
      addressState: "Test State Address 1",
      addressZipCode: "Test Zip Code Address 1",
      items: [
        {
          id: "1pc",
          name: "Test Product 1",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2pc",
          name: "Test Product 2",
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3pc",
          name: "Test Product 3",
          price: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });
  });

  describe("findById", () => {
    it("should be return an invoice", async () => {
      const response = await request(app).get("/api/invoice/1i").expect(200);
      expect(response.body.id).toBe("1i");
      expect(response.body.name).toBe("Test Invoice 1");
      expect(response.body.document).toBe("Test Document 1");
      expect(response.body.address.street).toBe("Test Street Address 1");
      expect(response.body.address.number).toBe("Test Number Address 1");
      expect(response.body.address.complement).toBe("Test Complement Address 1");
      expect(response.body.address.city).toBe("Test City Address 1");
      expect(response.body.address.state).toBe("Test State Address 1");
      expect(response.body.address.zipCode).toBe("Test Zip Code Address 1");
      expect(response.body.items.length).toBe(3);
    });
  });
});
