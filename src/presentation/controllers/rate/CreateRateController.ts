import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelper';
import { IController, IHttpResponse, IValidation } from '@/presentation/protocols';
import { ICreateRate } from '@/domain/usecases/rate/ICreateRate';

export namespace CreateRateController {
  export type Request = {
    userId: string
    providerId: string
    star: number
    comment: string
  }
}

export class CreateRateController implements IController {
  constructor(
    private readonly createRate: ICreateRate,
    private readonly validation: IValidation,
  ) {}

  async handle(request: CreateRateController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error);
      const provider = await this.createRate.create({ ...request, createdAt: new Date() });
      if (provider) return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
