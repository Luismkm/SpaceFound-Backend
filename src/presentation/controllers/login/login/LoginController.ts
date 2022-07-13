import { badRequest, serverError, success, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse, IValidation } from '@/presentation/protocols';
import { IAuthentication } from '@/domain/usecases/account/IAuthentication';

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}

export class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation,
  ) {}

  async handle(request: LoginController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error);
      const authenticationModel = await this.authentication.auth(request);
      if (!authenticationModel) return unauthorized();
      return success(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
