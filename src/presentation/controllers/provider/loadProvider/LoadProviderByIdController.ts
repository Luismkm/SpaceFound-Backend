import { InvalidParamError } from '@/presentation/errors';
import {
  forbidden, noContent, serverError, success,
} from '@/presentation/helpers/http/httpHelper';

import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols';
import { ILoadProviderById } from './LoadProvidersControllerProtocols';

export class LoadProviderByIdController implements IController {
  constructor(private readonly loadProviderById: ILoadProviderById) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { providerId } = httpRequest.params;
      const provider = await this.loadProviderById.loadById(providerId);
      if (provider) {
        return success(provider);
      }
      return forbidden(new InvalidParamError('providerId'));
    } catch (error) {
      return serverError(error);
    }
  }
}
