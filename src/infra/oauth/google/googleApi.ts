import { ILoadGoogleUser, LoadGoogleUser } from '@/domain/usecases/login/ILoadUserGoogle';
import { HttpGetClient, HttpPostClient } from '@/infra/httpClient/client';
import { googleAuthConfig } from '@/main/config/googleAuthConfig';

type Params = LoadGoogleUser.Params;
type Result = LoadGoogleUser.Result;

export class GoogleApi implements ILoadGoogleUser {
  constructor(
    private readonly httpClient: HttpPostClient & HttpGetClient,
  ) {}

  async loadUser({ code }: Params): Promise<Result> {
    const userInfo = await this.getAppToken(code)
    return userInfo
  }

  private async getAppToken(code: any): Promise<any> {
    const token = await this.httpClient.post({
      url: process.env.GOOGLE_TOKEN_URL,
      data: JSON.stringify({ code, ...googleAuthConfig }),
      headers: { 'Content-Type': 'application/json' },
    })
    const userInfo = await this.getUserInfo(token)
    return userInfo
  }

  private async getUserInfo(clientToken: any): Promise<any> {
    const { id_token, access_token } = clientToken;
    const userInfo = await this.httpClient.get({
      url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });
    console.log('AKIII', userInfo)
    return userInfo
  }
}
