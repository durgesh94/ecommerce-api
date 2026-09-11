import { z } from 'zod';

export const addressTypeSchema = z.enum(['HOME', 'WORK', 'OTHER']);

export const createAddressSchema = z.object({
  addressLine1: z
    .string()
    .trim()
    .min(1, 'Address line 1 is required')
    .max(255, 'Address line 1 must be at most 255 characters'),
  addressLine2: z
    .string()
    .trim()
    .max(255, 'Address line 2 must be at most 255 characters')
    .nullable(),
  city: z
    .string()
    .trim()
    .min(1, 'City is required')
    .max(255, 'City must be at most 255 characters'),
  state: z
    .string()
    .trim()
    .min(1, 'State is required')
    .max(255, 'State must be at most 255 characters'),
  postalCode: z
    .string()
    .trim()
    .min(6, 'Postal code must be at least 6 characters')
    .max(20, 'Postal code must be at most 20 characters'),
  country: z
    .string()
    .trim()
    .min(1, 'Country is required')
    .max(255, 'Country must be at most 255 characters'),
  isDefault: z.boolean().default(false),
  type: addressTypeSchema.default('HOME'),
});

export const updateAddressSchema = createAddressSchema.partial();

