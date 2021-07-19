import { IAuthentication } from '@/domain/usecases/account/IAuthentication';
import { badRequest, unauthorized } from '@/presentation/helpers/http/httpHelper';
import {
  IController, IHttpRequest, IHttpResponse, IValidation,
} from '@/presentation/protocols';

export class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    const accessToken = await this.authentication.auth(httpRequest.body);
    if (!accessToken) {
      return unauthorized();
    }
  }
}
