import { Gender, Entry, Diagnose, NewEntry, HealthCheckRating, Discharge } from './types';
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isEntryType = (param: string): param is Entry['type']  => {
  return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(param)
}

const parseDescription = (desc: unknown): string => {
  if (!isString(desc)) {
    throw new Error('Incorrect or missing description')
  }
  return desc
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSpecialist = (spec: unknown): string => {
  if (!isString(spec)) {
    throw new Error('Incorrect or missing specialist')
  }
  return spec
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};


const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  const ratingNum = Number(rating)

  if (
    Number.isInteger(ratingNum) &&
    Object.values(HealthCheckRating).includes(ratingNum as HealthCheckRating)
  ) {
    return ratingNum as HealthCheckRating;
  }
  return Number(rating) as HealthCheckRating;
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== 'object' ||
    !('date' in discharge) ||
    !('criteria' in discharge)
  ) {
    throw new Error('Incorrect or missing discharge')
  }

  const d = discharge as Discharge
  if (!isString(d.date) || !isString(d.criteria)) {
    throw new Error('Incorrect discharge fields')
  }

  return d
}

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employerName')
  }
  return employerName
}

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object' || Array.isArray(object)) {
    throw new Error('Incorrect or missing data');
  }

  const obj = object as Record<string, unknown>;

  if (!('description' in obj) || !('date' in obj) || !('specialist' in obj) || !('type' in obj)
  ) {
    throw new Error('Common fields or type missing');
  }

  const description = parseDescription(obj.description);
  const date = parseDate(obj.date);
  const specialist = parseSpecialist(obj.specialist);
  const diagnosisCodes = parseDiagnosisCodes(obj.diagnosisCodes);

  switch (obj.type as string) {
    case 'HealthCheck':
      if (!isEntryType('HealthCheck') || !('healthCheckRating' in obj)) {
        throw new Error('Invalid HealthCheck entry');
      }
      return {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      } as NewEntry;

    case 'Hospital':
      if (!isEntryType('Hospital') || !('discharge' in obj)) {
        throw new Error('Invalid Hospital entry')
      }
      return {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: 'Hospital',
        discharge: parseDischarge(obj.discharge),
      } as NewEntry;

    case 'OccupationalHealthcare':
      if (!isEntryType('OccupationalHealthcare') || !('employerName' in obj)) {
        throw new Error('Invalid OccupationalHealthcare entry')
      }
      return {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(obj.employerName),
      } as NewEntry;

    default:
      throw new Error('Unknown entry type: ' + obj.type)
  }
}


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


