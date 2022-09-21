import { z } from 'zod';

export const VehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3),
  status: z.boolean().optional(),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).gte(1900).lte(2022),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3),
  buyValue: z.number({
    required_error: 'BuyValue is required',
    invalid_type_error: 'BuyValue must be a string',
  }).int(),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;
