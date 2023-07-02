import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';

import { IValidation } from '@/presentation/protocols';
import { makeCreateProviderValidation } from '@/main/factories/controllers/provider/createProviderValidationFactory';

jest.mock('@/validation/validators/ValidationComposite');

describe('Create Provider Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeCreateProviderValidation();
    const validations: IValidation[] = [];
    for (const field of ['name', 'description', 'serviceId']) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
