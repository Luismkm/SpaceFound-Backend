import { IController } from '@/presentation/protocols';
import { CreateRateController } from '@/presentation/controllers/rate/CreateRateController';
import { makeCreateRateValidation } from '@/main/factories/controllers/rate/createRateValidationFactory';
import { makeDbCreateRate } from '@/main/factories/usecases/rate/createRateFactory';

export const makeCreateRateController = (): IController => {
  const controller = new CreateRateController(
    makeDbCreateRate(),
    makeCreateRateValidation(),
  );
  return controller;
};
