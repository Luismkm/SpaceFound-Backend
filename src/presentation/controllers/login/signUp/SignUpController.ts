import {
  IController, ICreateAccount, IHttpRequest, IHttpResponse, serverError, success,
} from '@/presentation/controllers/login/signUp/SignUpControllerProtocols';

export class SignUpController implements IController {
  constructor(private readonly createAccount: ICreateAccount) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;
      const account = await this.createAccount.create({ name, email, password });
      if (account) {
        return success(account);
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
