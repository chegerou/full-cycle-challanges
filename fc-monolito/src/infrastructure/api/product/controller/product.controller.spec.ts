import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../../migration/config/migrator";
import ProductRouter from "../routes/product.router";
import { ProductModel as ProductAdmModel } from "../../../../modules/product-adm/repository/product.model";
import { ProductModel as StoreCatalogModel } from "../../../../modules/store-catalog/repository/product.model";

describe("ProductController", () => {
  const app: Express = express();
  app.use(express.json());
  app.use(new ProductRouter().init());

  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ProductAdmModel, StoreCatalogModel]);
    migration = migrator(sequelize);
    await migration.up();
  });

  afterEach(async () => {
    if (!migration || !sequelize) return;
    await migration.down();
    await sequelize.close();
  });

  it("should be create a product", async () => {
    const data = {
      id: "1",
      name: "banana",
      description: "Amarelo e com manchas pretas",
      purchasePrice: 5,
      stock: 10,
    };

    const response = await request(app).post("/api/products/register").send(data);

    expect(response.status).toBe(201);
    expect(response.text).toBe("Product Created...");
  });
});
