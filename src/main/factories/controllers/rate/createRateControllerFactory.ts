import { CreateRateController } from '@/presentation/controllers/rate/CreateRateController';
import { IController } from '@/presentation/protocols';
import { makeDbCreateRate } from '@/main/factories/usecases/rate/dbCreateRateFactory';
import { makeCreateRateValidation } from './createRateValidationFactory';

export const makeCreateRateController = (): IController => {
  const controller = new CreateRateController(
    makeDbCreateRate(),
    makeCreateRateValidation(),
  );
  return controller;
};
