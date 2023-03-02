import { noContent, serverError, ok } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols';
import { ILoadProviders } from '@/domain/usecases/provider/ILoadProviders';

export class LoadProvidersController implements IController {
  constructor(private readonly loadProviders: ILoadProviders) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const providers = await this.loadProviders.load();
      return providers.length ? ok(providers) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
