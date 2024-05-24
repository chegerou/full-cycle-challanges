import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../../modules/payment/repository/transaction.model";
import { ProductModel as ProductAdmModel } from "../../../modules/product-adm/repository/product.model";
import { ProductModel as StoreCatalogModel } from "../../../modules/store-catalog/repository/product.model";
import { Umzug } from "umzug";
import { migrator } from "../../migrations/config/migrator";

export default class Database {
  public connection: Sequelize;
  private migration: Umzug<any>;

  constructor() {
    this.connect();
  }

  connect(): void {
    this.connection = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      database: "sequelize",
      logging: false,
      models: [
        ClientModel,
        InvoiceModel,
        TransactionModel,
        ProductAdmModel,
        StoreCatalogModel,
      ],
    });
    this.migration = migrator(this.connection);
  }

  async migrateUp(): Promise<void> {
    await this.migration.up();
  }

  async migrateDown(): Promise<void> {
    await this.migration.down();
  }
}
