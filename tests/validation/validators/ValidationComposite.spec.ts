import { IValidation } from '@/presentation/protocols';
import { ValidationComposite } from '@/validation/validators/ValidationComposite';

import { mockValidation } from '@/tests/validation/mocks/mockValidations';
import { MissingParamError } from '@/presentation/errors';

type ISutTypes = {
  sut: ValidationComposite
  validationStub: IValidation[]
}

const makeSut = (): ISutTypes => {
  const validationStub = [
    mockValidation(),
    mockValidation(),
  ];
  const sut = new ValidationComposite(validationStub);

  return {
    sut,
    validationStub,
  };
};

describe('Validation Composite', () => {
  it('should return error if any validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ wrong_field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('should return the first error if more then one validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new Error());
    jest.spyOn(validationStub[1], 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ wrong_field: 'any_field' });
    expect(error).toEqual(new Error());
  });
});
