import {
  badRequest, serverError, success,
} from '@/presentation/helpers/http/httpHelper';

import {
  IController, ICreateProvider, IHttpRequest, IHttpResponse, IValidation,
} from '@/presentation/controllers/provider/createProvider/ProviderControllerProtocols';

export class CreateProviderController implements IController {
  constructor(
    private readonly createProvider: ICreateProvider,
    private readonly validation: IValidation,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { userId } = httpRequest;
      const { idBusiness, description } = httpRequest.body;
      const provider = await
      this.createProvider.create({ idUser: userId, idBusiness, description });

      return success(provider);
    } catch (error) {
      return serverError(error);
    }
  }
}
