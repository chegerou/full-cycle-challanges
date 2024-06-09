import { Sequelize } from "sequelize-typescript";
import ClientModel from "../../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../../modules/payment/repository/transaction.model";
import ProductModel from "../../../modules/product-adm/repository/product.model";
import StoreCatalogModel from "../../../modules/store-catalog/repository/product.model";
import { Umzug } from "umzug";
import { migrator } from "../../migration/config/migrator";

export default class Database {
  public connection: Sequelize;
  private migration: Umzug<any>;

  public async connect(): Promise<void> {
    console.log("Conectando ao banco de dados...");
    this.connection = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    console.log("Criando as tabelas...");
    this.connection.addModels([
      ClientModel,
      InvoiceModel,
      TransactionModel,
      ProductModel,
      StoreCatalogModel,
    ]);

    try {
      this.migration = migrator(this.connection);

      await this.migration.down();
      await this.migration.up();
      console.log("As Migrations foram executadas com sucesso....");

      await this.connection.sync();
      console.log("Sincronizando o banco de dados...");
    } catch (error) {
      console.error(
        "Não foi possível conectar ao banco de dados ou executar a migrations:",
        error
      );
    }
  }
}
