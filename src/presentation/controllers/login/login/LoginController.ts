import { IAuthentication } from '@/domain/usecases/account/IAuthentication';
import {
  IController, IHttpRequest, IHttpResponse, IValidation,
} from '@/presentation/protocols';

export class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    this.authentication.auth(httpRequest.body);
    return Promise.resolve(null);
  }
}
