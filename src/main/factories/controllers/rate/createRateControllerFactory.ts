import { CreateRateController } from '@/presentation/controllers/rate/CreateRateController';
import { makeDbCreateRate } from '@/main/factories/usecases/rate/dbCreateRateFactory';
import { makeCreateRateValidation } from './createRateValidationFactory';

import { IController } from '@/presentation/protocols';

export const makeCreateRateController = (): IController => {
  const controller = new CreateRateController(
    makeDbCreateRate(),
    makeCreateRateValidation(),
  );
  return controller;
};
