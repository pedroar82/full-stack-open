import { Patient, Gender, Diagnosis } from "../types";
import { useParams } from 'react-router-dom'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

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
            <div key={index}>
              <p>
                {e.date} {e.description}
              </p>
              <ul>
                {e.diagnosisCodes?.map((d, ind) => (
                  <li key={ind}>{d} {getDiagnosis(d)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    }
    return (<div></div>)
};

export default PatientInfoPage;