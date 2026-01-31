import { v1 as uuid } from 'uuid'
import patientsData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types'

const patients: Patient[] = patientsData as Patient[];

const getPatients = ():Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    ssn,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
}

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id: id,
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
}

const findById = (id: string): Patient | undefined => {  
  const patient = patients.find(p => p.id === id);
  return patient;
}

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const patient = findById(id);
   if (!patient) return undefined;
  const entryId = uuid();

  const newEntry = {
    id: entryId,
    ...entry
  } as Entry

  patients.map((p) => {
    if (p.id === id) {
      p.entries.push(newEntry);
    }
  });
  
  return patient
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry
};