import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().positive()
    .gte(2, { message: 'DoorsQty must be 2 or more characters long' }).lte(4),
  seatsQty: z.number().positive()
    .gte(2, { message: 'SeatsQty must be 2 or more characters long' }).lte(7),
});

export type ICar = z.infer<typeof CarZodSchema>;
