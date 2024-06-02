import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import CheckoutRouter from "../router/checkout.router";
import ClientModel from "../../../../modules/client-adm/repository/client.model";
import OrderModel from "../../../../modules/checkout/repository/order.model";
import TransactionModel from "../../../../modules/payment/repository/transaction.model";
import InvoiceModel from "../../../../modules/invoice/repository/invoice.model";
import ProductModel from "../../../../modules/product-adm/repository/product.model";
import StoreCatalogModel from "../../../../modules/store-catalog/repository/product.model";
import { Umzug } from "umzug";
import { migrator } from "../../../migration/config/migrator";

describe("CheckoutController", () => {
  const app: Express = express();
  app.use(express.json());
  app.use(new CheckoutRouter().init());

  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    sequelize.addModels([
      ClientModel,
      InvoiceModel,
      TransactionModel,
      ProductModel,
      StoreCatalogModel,
      OrderModel,
    ]);
    migration = migrator(sequelize);
    await migration.up();

    await sequelize.sync();

    await ClientModel.create({
      id: "1c",
      name: "John Doe",
      email: "johndoe@example.com",
      document: "459.537.710-02",
      street: "Rua Júlio da Silva Barbosa",
      number: "123",
      complement: "Bairro: São Cristóvão",
      city: "Vitória",
      state: "ES",
      zipCode: "29048-530",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "1p",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "2p",
      name: "Product 2",
      description: "Description 2",
      purchasePrice: 200,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    try {
      await StoreCatalogModel.create({
        id: "1p",
        name: "Product 1",
        description: "Description 1",
        salesPrice: 100,
      });
    } catch (error) {
      console.log(error);
    }

    await StoreCatalogModel.create({
      id: "2p",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });
  });

  afterEach(async () => {
    if (!migration || !sequelize) return;
    await migration.down();
    await sequelize.close();
  });

  it("should be create a order", async () => {
    const order = {
      clientId: "1c",
      products: [
        {
          productId: "1p",
        },
        {
          productId: "2p",
        },
      ],
    };

    const response = await request(app).post("/api/checkout").send(order);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.status).toBe("approved");
    expect(response.body.total).toBe(300);
    expect(response.body.products.length).toBe(2);
  });
});
