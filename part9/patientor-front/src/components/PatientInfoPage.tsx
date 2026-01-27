import { Patient, Gender, Diagnosis } from "../types";
import { useParams } from 'react-router-dom'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetailsPage from "./EntryDetailsPage"
import Box from '@mui/material/Box';


type PatientInfoPageProps = {
    patients: Patient[]
    diagnoses: Diagnosis[]
}

const PatientInfoPage = ({patients, diagnoses}: PatientInfoPageProps) => {
    const params = useParams<{ id: string }>();
    const id = params.id ?? '';
    const patient = patients.find(p=>p.id===id);

    const getDiagnosis = (code: string): string => {
        return diagnoses.find(d => d.code === code)?.name ?? '';
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
          <h3>entries</h3>
          {patient.entries.map((e, index) => (
            <Box
              key={index}
              component="section"
              sx={{
                width: '100%',
                border: 2,
                borderColor: 'grey.500',
                borderRadius: 2,
                p: 1,
                mt: 1
              }}
            >
              <EntryDetailsPage entry={e} />
            </Box>
          ))}
        </div>
      )
    }
    return (<div></div>)
};

export default PatientInfoPage;