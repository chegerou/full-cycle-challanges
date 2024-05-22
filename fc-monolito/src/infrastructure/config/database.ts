import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { ProductModel as ProductAdmModel } from "../../modules/product-adm/repository/product.model";
import { ProductModel as StoreCatalogModel } from "../../modules/store-catalog/repository/product.model";

const connection = new Sequelize({
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

export default connection;
