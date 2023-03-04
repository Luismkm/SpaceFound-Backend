import { ILoadProviderById } from '@/domain/usecases/provider/ILoadProviderById';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden, serverError, ok } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols';

export class LoadProviderByIdController implements IController {
  constructor(private readonly loadProviderById: ILoadProviderById) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { providerId } = httpRequest.params;
      const provider = await this.loadProviderById.load(providerId);
      if (provider) return ok(provider);
      return forbidden(new InvalidParamError('providerId'));
    } catch (error) {
      return serverError(error);
    }
  }
}
