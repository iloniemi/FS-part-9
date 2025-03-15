import { NewPatient, Gender } from './types';
import { z } from 'zod';

const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export const newPatientSchema = z.object({
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  occupation: z.string(),
  name: z.string(),
});

export default toNewPatient;