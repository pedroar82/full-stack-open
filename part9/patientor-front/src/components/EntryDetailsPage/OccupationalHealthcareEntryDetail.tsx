

import { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface OccupationalHealthcareEntryDetailProps{
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetail = ({
  entry,
}: OccupationalHealthcareEntryDetailProps) => {
  return (
    <div>
        <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}

export default OccupationalHealthcareEntryDetail
