import { noContent } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse } from '@/presentation/protocols';
import { ICreateUserByGoogleProvider } from '@/domain/usecases/login/ICreateUserByGoogleProvider';
import { IGoogleAuthentication } from '@/domain/usecases/login/IGoogleAuthentication';
import { HttpGetClient, HttpPostClient } from '@/infra/httpClient/client';
import { googleAuthConfig } from '@/main/config/googleAuthConfig';

export class GoogleProviderController implements IController {
  constructor(
    private readonly httpClient: HttpPostClient & HttpGetClient,
    private readonly createUserByGoogleProvider: ICreateUserByGoogleProvider,
    private readonly googleAuthentication: IGoogleAuthentication,
  ) {

  }
  async handle(request: any): Promise<IHttpResponse> {
    const { code } = request;
    try {
      const tokenResponse = await this.httpClient.post({
        url: process.env.GOOGLE_TOKEN_URL,
        data: JSON.stringify({ code, ...googleAuthConfig }),
        headers: { 'Content-Type': 'application/json' },
      })

      const { id_token, access_token } = tokenResponse;

      const userinfoResponse = await this.httpClient.get({
        url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      });
      // Dados do usuário autenticado
      const userData = userinfoResponse;

      await this.createUserByGoogleProvider.create({ ...userData })

      const token = await this.googleAuthentication.auth(userData.email)
      console.log(token)
      return noContent()
    } catch (error) {
      console.log(error)
      return noContent()
    }
  }
}
