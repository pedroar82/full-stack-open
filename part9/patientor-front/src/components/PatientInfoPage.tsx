import { useState } from "react";
import axios from 'axios';
import { Patient, Gender, Diagnosis, EntryFormValues, Entry } from "../types";
import { useParams } from 'react-router-dom'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetailsPage from "./EntryDetailsPage"
import Box from '@mui/material/Box';
import AddEntryForm from './AddEntryForm'
import { Alert } from '@mui/material';
import patientService from "../services/patients";

type PatientInfoPageProps = {
    patients: Patient[]
    diagnoses: Diagnosis[]
}

const PatientInfoPage = ({ patients, diagnoses }: PatientInfoPageProps) => {
  const params = useParams<{ id: string }>();
  const id = params.id ?? '';
  const patient = patients.find((p) => p.id === id);
  const [error, setError] = useState<string>();
  const [entries, setEntries] = useState<Entry[] | undefined>(patient?.entries);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntry(id, values);
      setEntries([...(entries || []), entry]);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            '',
          )
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  }

  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}
          {patient.gender === Gender.Female ? (
            <FemaleIcon />
          ) : patient.gender === Gender.Male ? (
            <MaleIcon />
          ) : (
            <TransgenderIcon />
          )}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm onSubmit={submitNewEntry} />
        <h3>entries</h3>
        {entries?.map((e, index) => (
          <Box
            key={index}
            component="section"
            sx={{
              width: '100%',
              border: 2,
              borderColor: 'grey.500',
              borderRadius: 2,
              p: 1,
              mt: 1,
            }}
          >
            <EntryDetailsPage entry={e} />
          </Box>
        ))}
      </div>
    )
  }
  return <div></div>
}

export default PatientInfoPage;