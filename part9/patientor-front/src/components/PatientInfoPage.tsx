import { Patient, Gender } from "../types";
import { useParams } from 'react-router-dom'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

type PatientInfoPageProps = {
    patients: Patient[]
}

const PatientInfoPage = ({patients}: PatientInfoPageProps) => {
    const params = useParams<{ id: string }>();
    const id = params.id ?? '';
    const patient = patients.find(p=>p.id===id);

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
        </div>
      )
    }
    return (<div></div>)
};

export default PatientInfoPage;