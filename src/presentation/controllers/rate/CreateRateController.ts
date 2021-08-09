import { ICreateRate } from '@/domain/usecases/rate/ICreateRate';
import { badRequest, serverError, success } from '@/presentation/helpers/http/httpHelper';
import {
  IController, IHttpRequest, IHttpResponse, IValidation,
} from '@/presentation/protocols';

export class CreateRateController implements IController {
  constructor(
    private readonly createRate: ICreateRate,
    private readonly validation: IValidation,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { userId } = httpRequest;
      const { idProvider, star, comment } = httpRequest.body;

      const provider = await
      this.createRate.create({
        idUser: userId, idProvider, star, comment,
      });

      return success(provider);
    } catch (error) {
      return serverError(error);
    }
  }
}
