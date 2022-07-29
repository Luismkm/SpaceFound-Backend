import { EmailInUseError } from '@/presentation/errors';
import { badRequest, forbidden, serverError, success } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse, IValidation } from '@/presentation/protocols';
import { IAuthentication, ICreateAccount } from '@/domain/usecases/account';

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    cityId: number
  }
}

export class SignUpController implements IController {
  constructor(
    private readonly createAccount: ICreateAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication,
  ) {}

  async handle(request: SignUpController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error);
      const { name, email, password, cityId } = request;
      const account = await this.createAccount.create({ name, email, password, cityId, createdAt: new Date() });
      if (!account) return forbidden(new EmailInUseError());
      const accessToken = await this.authentication.auth({ email, password });
      if (accessToken) return success(accessToken);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
