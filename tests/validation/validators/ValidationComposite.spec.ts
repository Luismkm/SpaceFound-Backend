import { ValidationComposite } from '@/validation/validators/ValidationComposite';
import { MissingParamError } from '@/presentation/errors';

import { IValidation } from '@/presentation/protocols';
import { ValidationSpy } from '@/tests/presentation/mocks/mockValidation';

type ISutTypes = {
  sut: ValidationComposite
  validationSpies: IValidation[]
}

const makeSut = (): ISutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy(),
  ];
  const sut = new ValidationComposite(validationSpies);

  return {
    sut,
    validationSpies,
  };
};

describe('Validation Composite', () => {
  it('should return error if any validation fails', () => {
    const { sut, validationSpies } = makeSut();
    jest.spyOn(validationSpies[0], 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ wrong_field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut();
    jest.spyOn(validationSpies[0], 'validate').mockReturnValueOnce(new Error());
    jest.spyOn(validationSpies[1], 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ wrong_field: 'any_field' });
    expect(error).toEqual(new Error());
  });

  it('Should not return if validation succeeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeFalsy();
  });
});
