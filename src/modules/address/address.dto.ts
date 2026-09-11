import { z } from 'zod';
import { addressTypeSchema, createAddressSchema, updateAddressSchema } from './address.schema';

export type AddressType = z.infer<typeof addressTypeSchema>;
export type CreateAddressDto = z.infer<typeof createAddressSchema>;
export type UpdateAddressDto = z.infer<typeof updateAddressSchema>;

export interface AddressResponseDto extends CreateAddressDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
