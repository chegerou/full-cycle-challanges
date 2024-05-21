import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
  InvoiceFacadeFindInputDto,
  InvoiceFacadeInputDto,
  InvoiceFacadeOutputDto,
} from "./facade.interface";

export interface UseCasesProps {
  createUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _createUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;
  constructor(usecaseProps: UseCasesProps) {
    this._createUseCase = usecaseProps.createUseCase;
    this._findUseCase = usecaseProps.findUseCase;
  }
  create(input: InvoiceFacadeInputDto): Promise<InvoiceFacadeOutputDto> {
    return this._createUseCase.execute(input);
  }

  find(input: InvoiceFacadeFindInputDto): Promise<InvoiceFacadeOutputDto> {
    return this._findUseCase.execute(input);
  }
}
