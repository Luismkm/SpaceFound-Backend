import { noContent, serverError, ok } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols';
import { ILoadAllProviders } from '@/domain/usecases/provider/ILoadAllProviders';

export class LoadProvidersController implements IController {
  constructor(private readonly loadAllProviders: ILoadAllProviders) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const providers = await this.loadAllProviders.loadAll();
      return providers.length ? ok(providers) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
