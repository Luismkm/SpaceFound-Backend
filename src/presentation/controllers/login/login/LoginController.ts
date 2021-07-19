import { IAuthentication } from '@/domain/usecases/account/IAuthentication';
import { unauthorized } from '@/presentation/helpers/http/httpHelper';
import {
  IController, IHttpRequest, IHttpResponse, IValidation,
} from '@/presentation/protocols';

export class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    this.validation.validate(httpRequest.body);
    const accessToken = await this.authentication.auth(httpRequest.body);
    if (!accessToken) {
      return unauthorized();
    }
  }
}
