import { IUpdateUserProfile } from '@/domain/usecases/user/IUpdateUserProfile';
import { badRequest, noContent, serverError, success, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/protocols';

export namespace UpdateProfileController {
  export type Request = {
    userId: string
    name: string
    email: string
  }
}

export class UpdateProfileController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateUserProfile: IUpdateUserProfile,
  ) {}

  async handle(request: UpdateProfileController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error);
      const { userId } = request;
      if (!userId) return unauthorized();
      const { name, email } = request;
      const user = await this.updateUserProfile.update({ userId, name, email });
      if (user) return noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
