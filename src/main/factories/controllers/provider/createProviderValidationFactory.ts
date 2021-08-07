import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';

import { IValidation } from '@/presentation/protocols';

export const makeCreateProviderValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['idBusiness', 'description']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
