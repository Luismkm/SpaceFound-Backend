import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { makeCreateProviderValidation } from '@/main/factories/controllers/provider/createProvider/createProviderValidationFactory';

import { IValidation } from '@/presentation/protocols';

jest.mock('@/validation/validators/ValidationComposite');

describe('Create Provider Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeCreateProviderValidation();
    const validations: IValidation[] = [];
    for (const field of ['idBusiness', 'description']) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
