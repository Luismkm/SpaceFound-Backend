import { CreateAdController } from '@/presentation/controllers/ad/CreateAdController';
import { IController } from '@/presentation/protocols';
import { makeDbCreateAd } from '@/main/factories/usecases/ad/dbCreateAdProviderFactory';
import { makeCreateAdValidation } from '@/main/factories/controllers/ad/createAdValidationFactory';

export const makeCreateAdController = (): IController => {
  const controller = new CreateAdController(
    makeDbCreateAd(),
    makeCreateAdValidation(),
  );
  return controller;
};
