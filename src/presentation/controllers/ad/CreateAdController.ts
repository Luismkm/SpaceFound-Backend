import { ICreateAd } from '@/domain/usecases/ad/ICreateAd';
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse, IValidation } from '@/presentation/protocols';

export namespace CreateAdController {
  export type Request = {
    userId: string
    title: string
    description: string
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
      const ad = await this.createAd.create({ ...request, createdAt: new Date() });
      if (ad) return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
