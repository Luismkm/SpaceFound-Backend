import { CreateAdController } from '@/presentation/controllers/ad/CreateAdController';
import { IController } from '@/presentation/protocols';
import { makeCreateAdValidation } from '@/main/factories/controllers/ad/createAdValidationFactory';
import { makeDbCreateAd } from '@/main/factories/usecases/ad/createAdProviderFactory';

export const makeCreateAdController = (): IController => {
  const controller = new CreateAdController(
    makeDbCreateAd(),
    makeCreateAdValidation(),
  );
  return controller;
};
