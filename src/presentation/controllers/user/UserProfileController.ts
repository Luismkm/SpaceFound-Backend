import {
  badRequest, serverError, success, unauthorized,
} from '@/presentation/helpers/http/httpHelper';

import {
  IController, IHttpRequest, IHttpResponse, IValidation,
} from '@/presentation/protocols';
import { IUpdateProfile } from '@/domain/usecases/user/IUpdateProfile';

export class UpdateProfileController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateProfile: IUpdateProfile,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { userId } = httpRequest;

      if (!userId) {
        return unauthorized();
      }

      const { name, email } = httpRequest.body;

      const user = await this.updateProfile.update({ userId, name, email });

      return success(user);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
