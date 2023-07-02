import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';

import { IValidation } from '@/presentation/protocols';
import { makeCreateAdValidation } from '@/main/factories/controllers/ad/createAdValidationFactory';

jest.mock('@/validation/validators/ValidationComposite');

describe('Create Ad Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeCreateAdValidation();
    const validations: IValidation[] = [];
    for (const field of ['title', 'description', 'serviceId']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
