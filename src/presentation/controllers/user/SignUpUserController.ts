import { IAuthentication, ICreateUserAccount } from '@/domain/usecases/user';
import { EmailInUseError } from '@/presentation/errors';
import { badRequest, forbidden, serverError, ok } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse, IValidation } from '@/presentation/protocols';

export namespace SignUpUserController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    cityId: number
  }
}

export class SignUpUserController implements IController {
  constructor(
    private readonly createAccount: ICreateUserAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication,
  ) {}

  async handle(request: SignUpUserController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error);
      const { name, email, password, cityId } = request;
      const account = await this.createAccount.create({ name, email, password, cityId, createdAt: new Date() });
      if (!account) return forbidden(new EmailInUseError());
      const accessToken = await this.authentication.auth({ email, password });
      if (accessToken) return ok(accessToken);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
