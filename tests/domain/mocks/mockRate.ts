import { IRate } from '@/domain/models/IRate';
import { ICreateRateDTO } from '@/domain/usecases/rate/ICreateRate';

export const mockRateDTO = (): ICreateRateDTO => ({
  idUser: 'any_uuid',
  idProvider: 'any_uuid',
  star: 1,
  comment: 'any_comment',
});

export const mockRate = (): IRate => ({
  ...mockRateDTO(), id: 1,
});
