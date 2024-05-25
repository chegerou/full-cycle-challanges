import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../../modules/payment/repository/transaction.model";
import { ProductModel as ProductAdmModel } from "../../../modules/product-adm/repository/product.model";
import { ProductModel as StoreCatalogModel } from "../../../modules/store-catalog/repository/product.model";
import { Umzug } from "umzug";
import { migrator } from "../../migration/config/migrator";

export default class Database {
  public connection: Sequelize;
  private migration: Umzug<any>;

  constructor() {
    this.connect();
  }

  async connect(): Promise<void> {
    console.log("Connecting to database...");
    this.connection = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    console.log("Database creating models...");
    this.connection.addModels([
      ClientModel,
      InvoiceModel,
      TransactionModel,
      ProductAdmModel,
      StoreCatalogModel,
    ]);

    this.migration = migrator(this.connection);

    try {
      console.log("Sync Database models...");
      await this.connection.authenticate();

      const pendingMigrations = await this.migration.pending();
      console.log("Pending migrations:", pendingMigrations);

      await this.migration.up();
      console.log("Migrations have been executed successfully.");
    } catch (error) {
      console.error(
        "Unable to connect to the database or execute migrations:",
        error
      );
    }
  }
}
