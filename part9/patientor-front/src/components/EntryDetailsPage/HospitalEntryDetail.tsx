import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface HospitalEntryProps{
    entry: HospitalEntry;
}

const HospitalEntryDetail = ({ entry }: HospitalEntryProps) => {
  return (
    <div>
       <p> {entry.date}<LocalHospitalIcon /> </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>
        Discharge: {entry.discharge.date} ({entry.discharge.criteria})
      </p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}

export default HospitalEntryDetail