import { ICreateAccount } from '@/domain/usecases/account/ICreateAccount';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols';
import { IController } from '@/presentation/protocols/IController';

export class SignUpController implements IController {
  constructor(private readonly createAccount: ICreateAccount) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, email, password } = httpRequest.body;
    const account = await this.createAccount.create({ name, email, password });
    return {
      statusCode: 200,
      body: account,
    };
  }
}
