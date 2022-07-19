import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelper';
import { IController, ICreateProvider, IHttpResponse, IValidation } from '@/presentation/controllers/provider/createProvider/ProviderControllerProtocols';

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
    private readonly createProvider: ICreateProvider,
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
