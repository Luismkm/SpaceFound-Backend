import {
  badRequest,
  IController, ICreateAccount, IHttpRequest, IHttpResponse, IValidation, serverError, success,
} from '@/presentation/controllers/login/signUp/SignUpControllerProtocols';

export class SignUpController implements IController {
  constructor(
    private readonly createAccount: ICreateAccount,
    private readonly validation: IValidation,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = httpRequest.body;
      const account = await this.createAccount.create({ name, email, password });
      if (account) {
        return success(account);
      }

      return success(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
