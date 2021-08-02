import { serverError, success, unauthorized } from '@/presentation/helpers/http/httpHelper';

import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols';
import { IUpdateAvatar } from '@/domain/usecases/user/IUpdateAvatar';

export class UserAvatarController implements IController {
  constructor(
    private readonly updateAvatar: IUpdateAvatar,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { userId } = httpRequest;
      const { filename } = httpRequest.file;

      if (!userId) {
        return unauthorized();
      }

      const user = await this.updateAvatar.update(userId, filename);

      if (!user) {
        return unauthorized();
      }

      return success(user);
    } catch (error) {
      return serverError(error);
    }
  }
}