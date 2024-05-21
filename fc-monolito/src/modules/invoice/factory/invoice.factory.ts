import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/genere-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const createUseCase = new GenerateInvoiceUseCase(repository);
    const findUseCase = new FindInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      createUseCase,
      findUseCase,
    });

    return facade;
  }
}
