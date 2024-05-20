import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice.entity";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice-items.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
      define: {
        underscored: false,
      },
    });

    await sequelize.addModels([InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "Document 1",
      address: new Address(
        "Street 1",
        "Number 1",
        "Complement 1",
        "City 1",
        "State 1",
        "ZipCode 1"
      ),
      items: [
        new InvoiceItems({
          id: new Id("1"),
          name: "Item 1",
          price: 10,
        }),
        new InvoiceItems({
          id: new Id("2"),
          name: "Item 2",
          price: 20,
        }),
      ],
    });

    await invoiceRepository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "1" },
    });

    expect(invoiceDb.id).toEqual(invoice.id.id);
    expect(invoiceDb.name).toEqual(invoice.name);
    expect(invoiceDb.document).toEqual(invoice.document);
    expect(invoiceDb.addressStreet).toEqual(invoice.address.street);
    expect(invoiceDb.addressNumber).toEqual(invoice.address.number);
    expect(invoiceDb.addressComplement).toEqual(invoice.address.complement);
    expect(invoiceDb.addressCity).toEqual(invoice.address.city);
    expect(invoiceDb.addressState).toEqual(invoice.address.state);
    expect(invoiceDb.addressZipCode).toEqual(invoice.address.zipCode);
    expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id.id);
    expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name);
    expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price);
    expect(invoiceDb.items[1].id).toEqual(invoice.items[1].id.id);
    expect(invoiceDb.items[1].name).toEqual(invoice.items[1].name);
    expect(invoiceDb.items[1].price).toEqual(invoice.items[1].price);
  });

  it("should find a invoice", async () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "Document 1",
      address: new Address(
        "Street 1",
        "Number 1",
        "Complement 1",
        "City 1",
        "State 1",
        "ZipCode 1"
      ),
      items: [
        new InvoiceItems({
          id: new Id("1"),
          name: "Item 1",
          price: 10,
        }),
        new InvoiceItems({
          id: new Id("2"),
          name: "Item 2",
          price: 20,
        }),
      ],
    });

    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);

    const invoiceDb = await invoiceRepository.find("1");

    expect(invoiceDb.id.id).toEqual(invoice.id.id);
    expect(invoiceDb.name).toEqual(invoice.name);
    expect(invoiceDb.document).toEqual(invoice.document);
    expect(invoiceDb.address.street).toEqual(invoice.address.street);
    expect(invoiceDb.address.number).toEqual(invoice.address.number);
    expect(invoiceDb.address.complement).toEqual(invoice.address.complement);
    expect(invoiceDb.address.city).toEqual(invoice.address.city);
    expect(invoiceDb.address.state).toEqual(invoice.address.state);
    expect(invoiceDb.address.zipCode).toEqual(invoice.address.zipCode);
    expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id);
    expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name);
    expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price);
    expect(invoiceDb.items[1].id).toEqual(invoice.items[1].id);
    expect(invoiceDb.items[1].name).toEqual(invoice.items[1].name);
    expect(invoiceDb.items[1].price).toEqual(invoice.items[1].price);
  });
});
