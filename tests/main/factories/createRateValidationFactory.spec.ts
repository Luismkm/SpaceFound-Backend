import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';

import { IValidation } from '@/presentation/protocols';

import { makeCreateRateValidation } from '@/main/factories/controllers/rate/createRateValidationFactory';

jest.mock('@/validation/validators/ValidationComposite');

describe('Create Rate Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeCreateRateValidation();
    const validations: IValidation[] = [];
    for (const field of ['idProvider', 'star']) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
