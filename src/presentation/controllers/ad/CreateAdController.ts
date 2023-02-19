import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse, IValidation } from '@/presentation/protocols';
import { ICreateAd } from '@/domain/usecases/ad/ICreateAd';

export namespace CreateAdController {
  export type Request = {
    userId: string
    title: string
    description: string
    serviceId: string
  }
}

export class CreateAdController implements IController {
  constructor(
    private readonly createAd: ICreateAd,
    private readonly validation: IValidation,
  ) {}

  async handle(request: CreateAdController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error);
      const { userId, ...restRequest } = request
      const ad = await this.createAd.create({ ...restRequest, accountId: userId, createdAt: new Date() });
      if (ad) return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
