import { MissingParamError } from '@/presentation/errors';
import { RequiredFieldValidation } from '@/validation/validators/RequiredFieldValidation';

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field');

describe('Required Field Validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
