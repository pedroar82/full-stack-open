import { NewPatient, Gender } from './types';



const parseStringFields = (comment: unknown, field: string): string => {
  if (!comment || !isString(comment)) {
    throw new Error(`Incorrect or missing ${field}`);
  }

  return comment;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

//Date parse
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

//Gender Parser
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseStringFields(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringFields(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseStringFields(object.occupation, 'occupation'),
    };

    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatient;