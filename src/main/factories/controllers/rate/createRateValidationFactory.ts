import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';

import { IValidation } from '@/presentation/protocols';

export const makeCreateRateValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['idProvider', 'star']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
