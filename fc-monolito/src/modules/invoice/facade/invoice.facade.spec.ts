import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.factory";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel]);
    await sequelize.sync();

    await InvoiceModel.create({
      id: "1",
      name: "Invoice 1",
      document: "Document 1",
      addressStreet: "Street 1",
      addressNumber: "Number 1",
      addressComplement: "Complement 1",
      addressCity: "City 1",
      addressState: "State 1",
      addressZipCode: "ZipCode 1",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 10,
        },
        {
          id: "2",
          name: "Item 2",
          price: 20,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a Invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Invoice 1",
      document: "Document 1",
      street: "Street 1",
      number: "Number 1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "ZipCode 1",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 10,
        },
        {
          id: "2",
          name: "Item 2",
          price: 20,
        },
      ],
    };

    const output = await facade.create(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.number).toBe(input.number);
    expect(output.complement).toBe(input.complement);
    expect(output.city).toBe(input.city);
    expect(output.state).toBe(input.state);
    expect(output.zipCode).toBe(input.zipCode);
    expect(output.items.length).toBe(input.items.length);
  });

  it("should find a Invoice", async () => {
    const facade = InvoiceFacadeFactory.create();
    const output = await facade.find({ id: "1" });
    expect(output.id).toBe("1");
  });
});
