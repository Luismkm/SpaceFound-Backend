import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';

export const makeCreateAdValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['userId', 'title', 'description', 'serviceId']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
