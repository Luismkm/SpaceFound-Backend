import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse, IValidation } from '@/presentation/protocols';
import { ICreateAccountProvider } from '@/domain/usecases/provider/ICreateAccountProvider';

export namespace CreateProviderController {
  export type Request = {
    name: string
    description: string
    cnpj: string
    serviceId: number
    userId: string
  }
}

export class CreateProviderController implements IController {
  constructor(
    private readonly createProvider: ICreateAccountProvider,
    private readonly validation: IValidation,
  ) {}

  async handle(request: CreateProviderController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const provider = await this.createProvider.create({ ...request, createdAt: new Date() });
      if (provider) return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
