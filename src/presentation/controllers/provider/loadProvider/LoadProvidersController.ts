import { noContent, serverError, success } from '@/presentation/helpers/http/httpHelper';

import {
  IController, IHttpRequest, IHttpResponse, ILoadProviders,
} from './LoadProvidersControllerProtocols';

export class LoadProvidersController implements IController {
  constructor(private readonly loadProviders: ILoadProviders) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const providers = await this.loadProviders.load();

      return providers.length ? success(providers) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
