import { IUpdateAvatar } from '@/domain/usecases/user';
import { serverError, success, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols';

export class AvatarController implements IController {
  constructor(
    private readonly update: IUpdateAvatar,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { userId } = httpRequest;
      const { fileName } = httpRequest.file;
      if (!userId) return unauthorized();
      const user = await this.update.updateAvatar({ userId, fileName });
      if (!user) return unauthorized();
      return success(user);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
