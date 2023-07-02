import { ICreateUserByGoogleProvider } from '@/domain/usecases/login/ICreateUserByGoogleProvider';
import { IGoogleAuthentication } from '@/domain/usecases/login/IGoogleAuthentication';
import { noContent, ok } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse } from '@/presentation/protocols';

export class GoogleProviderController implements IController {
  constructor(
    private readonly googleApi: any,
    private readonly createAccount: ICreateUserByGoogleProvider,
    private readonly googleAuthentication: IGoogleAuthentication,
  ) {}
  async handle(request: any): Promise<IHttpResponse> {
    const { code } = request;
    try {
      const userInfo = await this.googleApi.loadUser({ code })
      await this.createAccount.create(userInfo)
      const accessToken = await this.googleAuthentication.auth({ email: userInfo.email })

      return ok(accessToken)
    } catch (error) {
      return noContent()
    }
  }
}
