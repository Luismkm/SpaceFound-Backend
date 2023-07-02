import { IUpdateAvatar } from '@/domain/usecases/user/IUpdateAvatar';
import { serverError, ok, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols';

export class AvatarController implements IController {
  constructor(
    private readonly update: IUpdateAvatar,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { accountId } = httpRequest;
      const { filename } = httpRequest;
      if (!accountId) return unauthorized();
      const user = await this.update.updateAvatar({ accountId, filename });
      if (!user) return unauthorized();
      return ok(user);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
