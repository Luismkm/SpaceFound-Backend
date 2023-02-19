import { badRequest, noContent, serverError, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse, IValidation } from '@/presentation/protocols';
import { IUpdateUserProfile } from '@/domain/usecases/user/IUpdateUserProfile';

export namespace UpdateProfileController {
  export type Request = {
    accountId: string
    name: string
    email: string
    cityId: number
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
      const { accountId } = request;
      if (!accountId) return unauthorized();
      const { name, email, cityId } = request;
      const user = await this.updateUserProfile.update({ accountId, name, email, cityId });
      if (user) return noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
