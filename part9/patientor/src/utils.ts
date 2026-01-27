import { Gender, Entry } from './types';
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const validateEntry = (entry: any): Entry => {
  switch (entry.type) {
    case 'Hospital':
    case 'HealthCheck':
    case 'OccupationalHealthcare':
      return entry as Entry;
    default:
      throw new Error('Invalid entry type');
  }
}