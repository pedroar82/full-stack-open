import { v1 as uuid } from 'uuid'
import patientsData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types'

const patients: Patient[] = patientsData as Patient[];

const getPatients = ():Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id: id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};