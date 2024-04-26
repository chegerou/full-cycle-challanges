import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const address = new Address(
  "street 1",
  "123",
  "complement 1",
  "city 1",
  "state 1",
  "12345-678"
);

const items = [
  new InvoiceItems({
    id: new Id("1"),
    name: "Product 1",
    price: 100,
  }),
  new InvoiceItems({
    id: new Id("2"),
    name: "Product 2",
    price: 200,
  }),
];

const invoice = new Invoice({
  name: "Client 1",
  document: "1234-5678",
  address: address,
  items: items,
  total: 300,
});

const MockRepository = () => {
  return {
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    find: jest.fn()
  };
};

describe("Generate Invoice usecase unit test", () => {
  it("should generate invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);

    const input = {
      name: "Client 1",
      document: "1234-5678",
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345-678",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
        },
        {
          id: "2",
          name: "Product 2",
          price: 200,
        },
      ],
      total: 300,
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items.length).toBe(2);
    expect(result.items[0].id).toBe(input.items[0].id);
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price);
    expect(result.items[1].id).toBe(input.items[1].id);
    expect(result.items[1].name).toBe(input.items[1].name);
    expect(result.items[1].price).toBe(input.items[1].price);
    expect(result.total).toBe(300);
  });
});
