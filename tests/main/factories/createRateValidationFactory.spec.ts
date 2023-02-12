import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { makeCreateRateValidation } from '@/main/factories/controllers/rate/createRateValidationFactory';

import { IValidation } from '@/presentation/protocols';

jest.mock('@/validation/validators/ValidationComposite');

describe('Create Rate Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeCreateRateValidation();
    const validations: IValidation[] = [];
    for (const field of ['star', 'comment']) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
