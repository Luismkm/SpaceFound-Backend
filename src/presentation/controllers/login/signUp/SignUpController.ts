import { EmailInUseError } from '@/presentation/errors';
import {
  badRequest, forbidden, serverError, success,
} from '@/presentation/helpers/http/httpHelper';

import {
  IAuthentication,
  IController, ICreateAccount, IHttpRequest, IHttpResponse, IValidation,
} from '@/presentation/controllers/login/signUp/SignUpControllerProtocols';

export class SignUpController implements IController {
  constructor(
    private readonly createAccount: ICreateAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = httpRequest.body;

      const account = await this.createAccount.create({ name, email, password });
      if (!account) {
        return forbidden(new EmailInUseError());
      }

      this.authentication.auth({ email, password });

      return success(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
