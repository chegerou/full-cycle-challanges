import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(input: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      addressStreet: input.address.street,
      addressNumber: input.address.number,
      addressComplement: input.address.complement,
      addressCity: input.address.city,
      addressState: input.address.state,
      addressZipCode: input.address.zipCode,
      items: input.items,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async find(id: string): Promise<Invoice> {
    const data = await InvoiceModel.findByPk(id);

    return new Invoice({
      id: new Id(data.id),
      name: data.name,
      document: data.document,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      address: new Address(
        data.addressStreet,
        data.addressNumber,
        data.addressComplement,
        data.addressCity,
        data.addressState,
        data.addressZipCode
      ),
      items: data.items.map(
        (item) =>
          new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
    });
  }
}
