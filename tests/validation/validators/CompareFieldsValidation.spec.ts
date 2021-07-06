import { InvalidParamError } from '@/presentation/errors';
import { CompareFieldsValidation } from '@/validation/validators';

const makeSut = ():CompareFieldsValidation => new CompareFieldsValidation(
  'field', 'fieldToCompare',
);

describe('Compare Fields Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value',
    });
    expect(error).toEqual(new InvalidParamError('fieldToCompare'));
  });
});
