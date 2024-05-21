export interface InvoiceFacadeInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface InvoiceFacadeOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}

export interface InvoiceFacadeFindInputDto {
  id: string;
}

export default interface InvoiceFacadeInterface {
  create(input: InvoiceFacadeInputDto): Promise<InvoiceFacadeOutputDto>;
  find(input: InvoiceFacadeFindInputDto): Promise<InvoiceFacadeOutputDto>;
}
